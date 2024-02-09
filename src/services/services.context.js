import { createContext } from "react";
import http from "./http";
import local from "./local";

/**
 * A factory function that creates the object passed to the context provider.
 * Using a factory function avoids direct mutations after it is created,
 * therefore ensuring that the object is immutable. This is the reason why all
 * service-interfacing hooks can be memoized.
 */
export const create = () => ({
  http: http.api,
  local: local.api,
});

/**
 * The React context that gets populated by either `Testing` or `Production` in
 * the environments folder. Using these two different top-level components in
 * combination with dependency injection allows the decoupling of all services
 * that are used outside of the core React logic.
 *
 * This ensures that specific conditions can easily be mocked and tested without
 * manually configuring these services.
 */
export const context = createContext(create());
