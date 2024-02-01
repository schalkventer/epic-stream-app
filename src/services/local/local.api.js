import { LOCAL_KEY } from "./local.helpers";

/**
 *
 * @param {object} state
 */
export const setSavedStore = (state) => {
  const string = JSON.stringify(state);
  window.localStorage.setItem(string, LOCAL_KEY);
};

/**
 *
 */
export const getSavedStore = () => {
  const string = window.localStorage.getItem(LOCAL_KEY);

  if (!string) return null;
  return JSON.parse(string);
};
