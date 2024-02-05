import { store } from "./data.store";

/**
 * @param {string} id
 */
export const useControls = () => {
  const start = (id) => store.setState((state) => ({ ...state, player: id }));
  const stop = () => store.setState((state) => ({ ...state, player: null }));

  return {
    start,
    stop,
  };
};
