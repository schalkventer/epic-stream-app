import { useStore } from "zustand";
import { store } from "./data.store";

export const useShowsList = () => useStore(store, (state) => state.shows);
export const useEpisodesList = () => useStore(store, (state) => state.episodes);
export const useFavourites = () => useStore(store, (state) => state.favourites);
export const usePlayer = () => useStore(store, (state) => state.favourites);

export default {
  useShowsList,
  useEpisodesList,
  useFavourites,
  usePlayer,
};
