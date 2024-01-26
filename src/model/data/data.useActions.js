import { useEndpoints } from "./data.useEndpoints";
import { store } from "./data.store";

export const useActions = () => {
  const endpoints = useEndpoints();

  return {
    /**
     *
     * @param {string} id
     */
    getEpisodes: async (id) => {
      const response = await endpoints.getEpisodes(id);
      store.setState({ shows: response });
    },
  };
};

export default {
  useActions,
};
