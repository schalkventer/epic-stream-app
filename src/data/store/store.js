import { createStore } from "zustand";
import { schema } from "./store.schema";

const createBlank = () =>
  schema.parse({
    shows: undefined,
    episodes: [],
    favourites: undefined,

    player: {
      id: null,
      status: "stopped",
    },
  });

export const store = createStore(createBlank);

// Un-comment for debugging purposes
// store.subscribe(console.log);
