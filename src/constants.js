/**
 * The global maximum width of all content allowed in the app. Using this global
 * constant across the app ensure consistency in how content is centered and
 * aligned on very large screens.
 */
export const MAIN_CONTENT_WIDTH = "100rem";

/**
 * The three main colors used throughout the app. Having this as a global
 * constant not only ensures consistency in styling across the app, but also
 * means that developers don't need to memorize the exact color swatches.
 */
export const COLORS = {
  accent: "#FC4747",

  foreground: {
    light: "#FFFFFF",
    medium: "#C5C6CB",
    dark: "#8E8E93",
  },

  background: {
    dark: "#10141E",
    medium: "#161D2F",
    light: "#2B3142",
  },
};

export default {
  COLORS,
  MAIN_CONTENT_WIDTH,
};
