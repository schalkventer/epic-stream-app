import { createElement, Fragment } from "react";
import { MemoryRouter } from "react-router-dom";
import services from "../../services/context";

/**
 * @param {object} param
 * @param {string} [show]
 * @param {string} [episode]
 */
export const createProvider =
  (mocking) =>
  // eslint-disable-next-line react/prop-types
  ({ children }) => {
    const value = services.mocking(mocking);

    return createElement(
      Fragment,
      {},
      createElement(
        MemoryRouter,
        {},
        createElement(services.context.Provider, { value }, children),
      ),
    );
  };
