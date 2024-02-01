import { createContext } from "react";
import http from "./http";
import local from "./local";

/**
 *
 */
export const create = () => ({
  http: http.api,
  local: local.api,
});

/**
 *
 */
export const context = createContext(create());
