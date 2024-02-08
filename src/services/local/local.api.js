import { LOCAL_KEY } from "./local.helpers";

/**
 *
 */
export const getSavedStore = () => {
  const string = window.localStorage.getItem(LOCAL_KEY);

  if (!string) return {};
  return JSON.parse(string);
};

/**
 *
 * @param {object} state
 */
export const setSavedStore = (newState) => {
  const saved = getSavedStore();

  const string = JSON.stringify({ ...saved, ...newState });
  window.localStorage.setItem(string, LOCAL_KEY);
};
