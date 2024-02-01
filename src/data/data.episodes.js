import { useStore } from "zustand";
import { useState, useContext, useEffect } from "react";
import { store } from "./data.store";
import helpers from "./helpers";
import schema from "./schema";
import services from "../services";
import validate from "../utils/validate";

/**
 *
 */
const useEndpoint = () => {
  const api = useContext(services.context);

  return {
    /**
     * @param {string} show
     */
    get: async (show) => {
      const response = await api.http.getFullShow(show);
      return helpers.episodes.responseToItems(response);
    },
  };
};

/**
 *
 */
export const useEpisodes = (initial) => {
  const endpoint = useEndpoint();
  const items = useStore(store, (state) => state.episodes);
  const [query, setQuery] = useState(validate(initial, schema.episodes.query));
  const list = helpers.episodes.applyQuery({ items, query });

  useEffect(() => {
    const callback = async () => {
      if (list.length < 1) {
        const { show } = query;
        const response = await endpoint.get(show);
        store.setState((state) => ({ ...state, episodes: response }));
      }
    };

    callback();
  }, [list, endpoint, query]);

  /**
   * @param {object} newQuery
   */
  const changeQuery = (newQuery) => {
    setQuery((current) =>
      validate({ ...current, ...newQuery }, schema.episodes.query),
    );
  };

  if (list.length === 0) return { list: [], query, changeQuery };
  return { list, query, changeQuery };
};