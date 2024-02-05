import { useState, useEffect, useContext, useMemo } from "react";
import { useStore } from "zustand";
import { store } from "../store";
import helpers from "./shows.helpers";
import schema from "./shows.schema";
import validate from "../../utils/validate";
import services from "../../services";

/**
 *
 */
let fired = false;

/**
 * A extremely thin abstraction over the service layer provided by the `context`
 * object.
 *
 * This hook is exclusively used to return a function that sends and HTTP
 * request to the server to fetch all show previews. No state should be stored
 * in this hook, and subsequently, the output of the hook is memoized to prevent
 * accidental re-render (if state is accidentally added). This means that the
 * object returned by the hook will never break referential equality in React.
 *
 * Note that `useRef` is used to prevent the re-firing of the HTTP request if it
 * has already fired during the session, or if it is currently awaiting a
 * response.
 */
const useSync = () => {
  const api = useContext(services.context);

  const sync = async () => {
    if (fired) return;
    fired = true;
    const response = await api.http.getPreviews();
    const result = helpers.responseToItems(response);
    store.setState((current) => ({ ...current, shows: result }));
  };

  // Note the the `useMemo` has no dependencies. This is intentional as a means
  // to prevent accidental re-renders.

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => sync, []);
};

/**
 * Filters all shows currently in the Zustand store and returns an array of
 * all matches.
 *
 * If the `shows` property in the store is `undefined` it means that no shows
 * have been retrieved from the server yet. In that case the hook will simply
 * return `null` and fire a request to the server to retrieve the shows. Once
 * the shows have been retrieved hook should reactively update the components
 * that consume it.
 *
 * The hook exposes three properties:
 *
 * - `result` - The array of `shows` that match the query, or temporarily `null`
 *   if the data is still being retrieved from the server. If no shows match the
 *   query then an empty array will be returned.
 *
 * - `query` - The current query object that determines which shows are returned
 *   by `result`. Returning the actual `query` object itself is useful if you
 *   want to display the active query in some manner to the user.
 *
 * - `changeQuery` - A function that changes the current query. Note that it
 *   automatically merges the new query with the existing one. This means that
 *   you only need to supply the properties you want to update, and it will be
 *   combined with the existing query. If the newly provided query matches the
 *   existing query nothing will happen. Otherwise, both `query`, and
 *   subsequently `result`, will be updated.
 *
 * @param {object} [initial] - The starting query that will be called
 * when the hook is initialised. If you do not pass a value, then the hook will
 * wait until `changeQuery` is manually called instead.
 */
const useList = (initial = null) => {
  const sync = useSync();
  const items = useStore(store, (state) => state.shows);
  const [result, setResult] = useState(null);

  const [query, setQuery] = useState(
    initial && validate(initial, schema.queries.list),
  );

  useEffect(() => {
    if (!query) return;

    if (!items) {
      sync();
      return;
    }

    setResult(helpers.applyListQuery({ items, query }));
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
 * Returns a single show object from the Zustand store.
 *
 * If the `shows` property in the store is `undefined` it means that no shows
 * have been retrieved from the server yet. In that case the hook will simply
 * return `null` and fire a request to the server to retrieve the shows. Once
 * the shows have been retrieved the matching show object will be returned.
 *
 * This hook works almost identical to `useList` but instead of returning an array
 * it simply returns a single show object. For this purpose see the `useList`
 * hook documentation for more details.
 *
 * @param {string | null} [id] - The ID value of the associated show. This
 * corresponds to the `id` property of a single show `item` schema.
 */
const useSingle = (initial = null) => {
  const sync = useSync();
  const items = useStore(store, (state) => state.shows);
  const [result, setResult] = useState(null);
  const [id, setId] = useState(initial);

  useEffect(() => {
    if (!id) return;

    if (!items) {
      sync();
      return;
    }

    setResult(helpers.getSingle({ items, id }));
  }, [id, items, sync]);

  /**
   * @param {string} id
   */
  const change = (newId) => {
    if (!newId) throw new Error("id is required");
    if (id === newId) return;
    setId(newId);
  };

  return validate(
    {
      result,
      id,
      change,
    },
    schema.results.single,
  );
};

export default { useList, useSingle };
