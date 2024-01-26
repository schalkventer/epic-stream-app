import { createStore } from "zustand";
import schema from "./data.schema";

const initial = schema.withDev(schema.store).devParse({
  shows: [],
  episodes: [],
  favourites: [],
  player: null,
});

export const store = createStore(() => initial);

export default {
  store,
};
