import { useMount } from "react-use";
import { useState, useContext, useMemo, useRef } from "react";
import { useStore } from "zustand";
import { store } from "../store";
import validate from "../../utils/validate";
import schema from "./progress.schema";
import services from "../../services";

/**
 * A extremely thin abstraction over the service layer provided by the `context`
 * object.
 *
 * This hook is exclusively used to interface with local storage on behalf of
 * the progress property in the Zustand store. It is primarily used to retrieved
 * any previous saved progress key-value pairs. However, it can also be used to
 * set/update the progress key-value pairs. Alternatively it can also be used to
 * reset all recorded progress to zero by means of `clear`.
 *
 * No state should be stored in this hook, and subsequently, the output of the
 * hook is memoized to prevent accidental re-render (if state is accidentally
 * added). This means that the object returned by the hook will never break
 * referential equality in React.
 *
 * Note that all these methods return the new state of the `progress` object
 * after their mutation.
 */
const useLocal = () => {
  const api = useContext(services.context);

  const get = () => {
    const { progress = {} } = api.local.getSavedStore() || {};
    return validate(progress, schema.list);
  };

  const update = (props) => {
    const { id, percentage } = props;

    if (!id) throw new Error("id is required");

    if (typeof percentage !== "number") {
      throw new Error("percentage is required");
    }

    const response = get();
    const result = validate({ ...response, [id]: percentage }, schema.list);
    api.local.setSavedStore({ progress: result });
    return result;
  };

  const clear = () => {
    api.local.setSavedStore({ progress: {} });
    return {};
  };

  // Note the the `useMemo` has no dependencies. This is intentional as a means
  // to prevent accidental re-renders.
  return useMemo(
    () => ({
      get,
      update,
      clear,
    }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
};

/**
 * A utility hook that is used in the majority of hooks related to `progress`.
 * It simply checks if the value of `progress` in the store is `undefined`. If
 * this is the case, it means that the current session store has not synced with
 * local storage yet. This hook will then query local storage and load the last
 * saved values into the Zustand store.
 */
const useSync = () => {
  const local = useLocal();

  useMount(() => {
    if (!store.getState().progress) store.setState({ progress: local.get() });
  });
};

/**
 * A hook that is used to get the progress value (as a number) of a single
 * episode. Since this information is stored locally and not on the server, the
 * `useLocal` hook is used.
 *
 * Upon calling the hook a string `initial` id value can be passed to
 * immediately return the progress of a specific episode. If no `initial` value
 * is passed, then no information will be fetched automatically. Instead
 * `change` needs to be called to manually set the `query` value to the string
 * ID of the episode.
 *
 * Note that if no progress value has been recorded for the episode yet (i.e. it
 * is not found in local storage `0` will simply be returned - since it is
 * assume that user has not started watching the episode yet).
 *
 * The following properties are returned:
 *
 * - `result` - the progress of the episode (as a number)
 * - `query` - the current query (as as a string)
 * - `change` - a function to update the query (and subsequently the `result`)
 *
 * Note that if the hook is created and the `progress` value in the store is
 * `undefined`, this means that the store has not been synced with local storage
 * yet.
 */
const useSingle = (initial = null) => {
  useSync();

  const items = useStore(store, (state) => state.progress);
  const [query, setQuery] = useState(initial);
  const result = !query ? null : items[query] || 0;

  const change = (newQuery) => {
    if (!newQuery) throw new Error("id is required");
    if (newQuery === query) return;
    setQuery(newQuery);
  };

  return validate(
    {
      result,
      query,
      change,
    },
    schema.results.single,
  );
};

/**
 * A simple abstraction over the native `setInterval` behaviour in the browser.
 * This hook returns two methods that start and/or stop a looping interval. At
 * each interval the `callback` function provided to `start` is fired.
 *
 * Since the interval is intended to be used, the callback is expected to return
 * a number (as a percentage). This percentage is meant to represent the
 * progress of specific episode at that point (the episode ID is also passed to
 * `start` as a string).
 *
 * @param {number} seconds - Determines how often the interval fires (as an
 * amount of seconds).
 */
export const useAutoUpdater = (seconds) => {
  const api = useLocal();
  const ref = useRef(null);

  return {
    /**
     * Starts a looping interval where the `callback` is fired recurringly as a
     * way to determine the progress (as a percentage number) of the episode (as
     * passed to `id`).
     *
     * @param {object} props
     * @param {string} props.id
     * @param {() => number} props.callback
     */
    start: (props) => {
      const { callback, id } = props;

      ref.current = setInterval(() => {
        store.setState({
          progress: api.update({ id, percentage: callback() }),
        });
      }, seconds * 1000);
    },

    /**
     * Stops the current looping interval. Please ensure to call this method
     * when the updating is no longer required in order to prevent memory leaks.
     */
    stop: () => {
      if (!ref.current) throw new Error("No interval to clear");
      clearInterval(ref.current);
    },
  };
};

/**
 * Reset all progress in the app to zero. This is a destructive action and
 * remove all progress information saved in local storage as well.
 */
const useClear = () => {
  const api = useLocal();
  store.setState({ progress: api.clear() });
};

export default {
  useSingle,
  useAutoUpdater,
  useClear,
};
