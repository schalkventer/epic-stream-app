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
 * @param {string} id
 */
export const useSingleShow = (id) => {
  const endpoint = useEndpoint();
  if (!id) throw new Error("id is required");
  const items = useStore(store, (state) => state.shows);

  useMount(async () => {
    if (items !== undefined) return;
    const response = await endpoint.get();
    store.setState((state) => ({ ...state, shows: response }));
  });

  if (items === undefined) return null;
  const result = items.find((item) => item.id === id);
  if (!result) throw new Error(`No show found with id ${id}`);
  return validate(result, schema.shows.item);
};

/**
 * @param {Object} initial
 */
export const useShowsList = (initial = {}) => {
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
