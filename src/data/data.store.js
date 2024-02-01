import { createStore } from "zustand";
import schema from "./schema";

const createBlank = () =>
  schema.store.parse({
    shows: undefined,
    episodes: [],
    favourites: undefined,
    player: undefined,
  });

export const store = createStore(createBlank);

// Un-comment for debugging purposes
// store.subscribe(console.log);
