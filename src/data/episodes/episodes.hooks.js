import { useState, useEffect, useContext, useMemo } from "react";
import { useStore } from "zustand";
import { store } from "../store";
import validate from "../../utils/validate";
import helpers from "./episodes.helpers";
import schema from "./episodes.schema";
import services from "../../services";

const fired = [];

/**
 * A extremely thin abstraction over the service layer provided by the `context`
 * object.
 *
 * This hook is exclusively used to return a function that sends and HTTP
 * request to the server to fetch all episodes associated with a specific show.
 * No state should be stored in this hook, and subsequently, the output of the
 * hook is memoized to prevent accidental re-render (if state is accidentally
 * added). This means that the object returned by the hook will never break
 * referential equality in React.
 *
 * Note that `useRef` is used to prevent the re-firing of HTTP request for the
 * same shows more than once. If a request for a show has already fired during
 * the session, or if it is currently awaiting a response then the function
 * won't do anything.
 *
 * @param {string} id - The `id` property associated with a specific show. This
 * value is commonly retrieved from `id` in the `show` object.
 */
const useSync = () => {
  const api = useContext(services.context);

  const sync = async (id) => {
    if (!id) throw new Error("id is required");
    if (fired.includes(id)) return true;
    fired.push(id);

    api.http.getFullShow(id).then((response) => {
      const result = helpers.responseToItems(response);

      store.setState((state) => ({
        ...state,
        episodes: [...state.episodes, ...result],
      }));
    });

    return false;
  };

  // Note the the `useMemo` has no dependencies. This is intentional as a means
  // to prevent accidental re-renders.

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => sync, []);
};

/**
 * Filters all episodes currently in the Zustand store and returns an array of
 * all matches.
 *
 * If the `episodes` property in the store is `undefined` it means that no
 * episodes have been retrieved from the server yet. In that case the hook will
 * simply return `null` and fire a request to the server to retrieve the
 * episodes. Once the episodes have been retrieved hook should reactively update
 * the components that consume it.
 *
 * Note that it is possible that some episodes might have already been retrieved
 * from the server, but that no episodes for the specific queried show have been
 * retrieved yet. In this case `null` will be returned and the required HTTP
 * request will be sent.
 *
 * The hook exposes three properties:
 *
 * - `result` - The array of `episodes` that match the query, or temporarily
 *   `null` if the data is still being retrieved from the server. If no queries
 *   match the query then an empty array will be returned.
 *
 * - `query` - The current query object that determines which episodes are
 *   returned by `result`. Returning the actual `query` object itself is useful
 *   if you want to display the active query in some manner to the user.
 *
 * - `changeQuery` - A function that changes the current query. Note that it
 *   automatically merges the new query with the existing one. This means that
 *   you only need to supply the properties you want to update, and it will be
 *   combined with the existing query. If the newly provided query matches the
 *   existing query nothing will happen. Otherwise, both `query`, and
 *   subsequently `result`, will be updated.
 *
 * @param {object} [initial] - The starting query that will be called when the
 * hook is initialised. If you do not pass a value, then the hook will wait
 * until `changeQuery` is manually called instead.
 */
const useList = (initial = null) => {
  const sync = useSync();
  const items = useStore(store, (state) => state.episodes);
  const [result, setResult] = useState(null);
  const [query, setQuery] = useState(initial);

  useEffect(() => {
    if (!query) return;

    const { show } = query;
    const response = sync(show);

    if (!response) {
      sync(show);
      setResult(null);
      return;
    }

    setResult(helpers.applyQuery({ items, query }));
  }, [query, items, sync]);

  /**
   * @param {object} newQuery
   */
  const change = (newQuery) => {
    const newQueryKey = helpers.createListQueryKey(newQuery);
    const currentQueryKey = helpers.createListQueryKey(query);
    if (newQueryKey === currentQueryKey) return;

    setQuery((current) =>
      validate({ ...current, ...newQuery }, schema.queries.list),
    );
  };

  return validate(
    {
      result,
      query,
      change,
    },
    schema.results.list,
  );
};

/**
 * Returns a single episode object from the Zustand store.
 *
 * If the `episode` property in the store is `undefined` it means that no
 * episodes have been retrieved from the server yet. In that case the hook will
 * simply return `null` and fire a request to the server to retrieve the episodes.
 * Once the episode has been retrieved the matching episode object will be returned.
 *
 * This hook works almost identical to `useList` but instead of returning an array
 * it simply returns a single show object. For this purpose see the `useList`
 * hook documentation for more details.
 *
 *
 *
 * @param {object | null} [id] - The ID value of the associated episode. This
 * corresponds to the `id` property of a single show `item` schema.
 *
 *
 */
const useSingle = (initial = null) => {
  const sync = useSync();
  const items = useStore(store, (state) => state.episodes);
  const [result, setResult] = useState(null);
  const [query, setQuery] = useState(initial);

  useEffect(() => {
    if (!query) return;

    if (!items) {
      const { show } = query;
      sync(show);
      return;
    }

    setResult(helpers.getSingle({ items, query }));
  }, [query, items, sync]);

  /**
   * @param {object} newQuery
   */
  const change = (newQuery) => {
    if (!newQuery) throw new Error("id is required");
    if (newQuery.id === query.id && newQuery.show === query.show) return;
    setQuery(newQuery);
  };

  return validate(
    {
      result,
      query,
      change,
    },
    schema.results.item,
  );
};

export default { useList, useSingle };