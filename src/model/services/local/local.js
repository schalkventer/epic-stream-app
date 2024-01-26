/**
 *
 */
export const LOCAL_KEY = "8ee5e78d-d3f5-4e58-b168-68d009e40054";

/**
 *
 */
export const module = {
  /**
   *
   * @param {object} state
   */
  setSavedStore: (state) => {
    const string = JSON.stringify(state);
    window.localStorage.setItem(string, LOCAL_KEY);
  },

  /**
   *
   * @returns {object}
   */
  getSavedStore: () => {
    const string = window.localStorage.getItem(LOCAL_KEY);

    if (!string) {
      return null;
    }

    return JSON.parse(string);
  },
};

export default {
  module,
};
