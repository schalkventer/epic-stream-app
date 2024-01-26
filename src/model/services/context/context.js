import { createContext } from "react";
import { module as http } from "../http";
import { module as local } from "../local";

export const createServices = () => ({
  http,
  local,
});

/**
 * @type {ReturnType<typeof createServices>}
 */
const empty = new Proxy(
  {},
  {
    get: () => () => {
      throw new Error("Provider parent required");
    },
  },
);

/** */
export const context = createContext(empty);
