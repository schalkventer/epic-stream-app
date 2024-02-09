/**
 *
 */
export const LOCAL_KEY = "fedf4b55-4559-4543-a01c-3fe489519738";

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
  window.localStorage.setItem(LOCAL_KEY, string);
};
