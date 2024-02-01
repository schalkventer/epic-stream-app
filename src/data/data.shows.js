import { useMount } from "react-use";
import { useStore } from "zustand";
import { useState, useContext, useRef, useEffect } from "react";
import { store } from "./data.store";
import helpers from "./helpers";
import schema from "./schema";
import services from "../services";
import validate from "../utils/validate";

/**
 *
 */
export const useEndpoint = () => {
  const api = useContext(services.context);

  return {
    /**
     *
     */
    get: async () => {
      const response = await api.http.getPreviews();
      return helpers.shows.responseToItems(response);
    },
  };
};

/**
 *
 */
export const useShows = (initial = {}) => {
  const endpoint = useEndpoint();
  const items = useStore(store, (state) => state.shows);
  const [list, setList] = useState(null);

  const [query, setQuery] = useState(
    validate({ ...helpers.shows.BLANK_QUERY, ...initial }, schema.shows.query),
  );

  useMount(async () => {
    if (items !== undefined) return;
    const response = await endpoint.get();
    store.setState((state) => ({ ...state, shows: response }));
  });

  const prev = useRef(null);

  useEffect(() => {
    if (!items) return;
    const key = helpers.shows.createQueryKey(query);

    if (prev.current === key) return;
    prev.current = key;

    setList(helpers.shows.applyQuery({ items, query }));
  }, [items, query, prev]);

  /**
   * @param {object} newQuery
   */
  const changeQuery = (newQuery) => {
    setQuery((current) =>
      validate({ ...current, ...newQuery }, schema.shows.query),
    );
  };

  return {
    list,
    query,
    changeQuery,
  };
};
