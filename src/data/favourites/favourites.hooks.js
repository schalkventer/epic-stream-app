import { useMount } from "react-use";
import { useState, useContext, useMemo } from "react";
import { useStore } from "zustand";
import { store } from "../store";
import validation from "../../utils/validation";
import helpers from "./favourites.helpers";
import schema from "./favourites.schema";
import services from "../../services/context";

/**
 * A extremely thin abstraction over the service layer provided by the `context`
 * object.
 *
 * This hook is exclusively used to interface with local storage on behalf of
 * the favourites property in the Zustand store. It is primarily used to
 * retrieved any previous saved favourite key-value pairs. However, it can also
 * be used to set/update the favourite key-value pairs. Alternatively it can
 * also be used to reset all recorded favourite to zero by means of `clear`.
 *
 * No state should be stored in this hook, and subsequently, the output of the
 * hook is memoized to prevent accidental re-render (if state is accidentally
 * added). This means that the object returned by the hook will never break
 * referential equality in React.
 *
 * Note that all these methods return the new state of the `favourites` object
 * after their mutation.
 */
const useLocal = () => {
  const api = useContext(services.context);

  const get = () => {
    const { favourites = [] } = api.local.getSavedStore() || {};
    const result = helpers.responseToList(favourites);
    return validation.check(result, schema.list);
  };

  const add = (id) => {
    const response = get();
    const result = validation.check(
      { ...response, [id]: new Date() },
      schema.list,
    );
    api.local.setSavedStore({ favourites: result });
    return result;
  };

  const remove = (id) => {
    const response = get();

    const entries = Object.entries(response).filter(([key]) => key !== id);
    const result = validation.check(Object.fromEntries(entries), schema.list);

    api.local.setSavedStore({ favourites: result });
    return result;
  };

  const clear = () => {
    api.local.setSavedStore({ favourites: {} });
    return {};
  };

  // Note the the `useMemo` has no dependencies. This is intentional as a means
  // to prevent accidental re-renders.
  return useMemo(
    () => ({
      get,
      add,
      remove,
      clear,
    }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
};

/**
 * A utility hook that is used in the majority of hooks related to `favourites`.
 * It simply checks if the value of `favourites` in the store is `undefined`. If
 * this is the case, it means that the current session store has not synced with
 * local storage yet. This hook will then query local storage and load the last
 * saved values into the Zustand store.
 */
const useSync = () => {
  const local = useLocal();

  useMount(() => {
    if (!store.getState().favourites)
      store.setState({ favourites: local.get() });
  });
};

/**
 * Returns a list of all favourited episodes (and dates they were added to
 * favourites) as an key-value pair object. This is useful if you want to show
 * the entire list of favourited episodes. However, note that you will still
 * need to run `episode` specific hooks to get more details based on the episode
 * IDs returned.
 *
 * If the list of favourites are not available yet `null` is returned.
 */
const useList = () => {
  useSync();
  const items = useStore(store, (state) => state.favourites);
  return validation.check(items || null, schema.results.list);
};

/**
 * A hook that is used to get the favourited value (as a Date) of a single
 * episode. Since this information is stored locally and not on the server, the
 * `useLocal` hook is used.
 *
 * Upon calling the hook a string `initial` id value can be passed to
 * immediately return the favourited date of a specific episode. If no `initial`
 * value is passed, then no information will be fetched automatically. Instead
 * `change` needs to be called to manually set the `query` value to the string
 * ID of the episode.
 *
 * Note that if no favourite value has been saved for the episode (i.e. it is
 * not found in local storage it can be assumed that epsiode is not favourited).
 *
 * The following properties are returned:
 *
 * - `result` - the Date the episode was favourited (as a `Date`)
 * - `query` - the current query (as as a string)
 * - `change` - a function to update the query (and subsequently the `result`)
 *
 * Note that if the hook is created and the `favourites` value in the store is
 * `undefined`, this means that the store has not been synced with local storage
 * yet.
 *
 * @param {string} [initial]
 */
const useSingle = (initial = null) => {
  useSync();
  const list = useList();
  const [query, setQuery] = useState(initial);

  /**
   * @param {string} id
   */
  const change = (newQuery) => {
    if (!newQuery) throw new Error("id is required");
    if (newQuery === query) return;
    setQuery(newQuery);
  };

  return validation.check(
    {
      query,
      change,
      result: helpers.getSingle({ list, id: query }),
    },
    schema.results.single,
  );
};

/**
 *
 */
const useToggle = () => {
  useSync();
  const api = useLocal();
  const list = useList();

  /**
   * @param {string} id
   */
  return (id) => {
    const isFav = Boolean(list[id]);

    store.setState({
      favourites: api[isFav ? "remove" : "add"](id),
    });
  };
};

/**
 * Reset all favourites in the app to zero. This is a destructive action and
 * remove all favourites saved in local storage as well.
 */
const useClear = () => {
  const api = useLocal();
  return () => store.setState({ favourites: api.clear() });
};

export default { useList, useSingle, useToggle, useClear };
