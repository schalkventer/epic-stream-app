import { COLORS } from "../../../constants";

/**
 *
 */
const calcImportance = (importance) => {
  if (importance === "primary") {
    return COLORS.foreground.light;
  }

  if (importance === "secondary") {
    return COLORS.foreground.medium;
  }

  if (importance === "inherit") return "inherit";
  throw new Error(`Unknown importance: ${importance}`);
};

/**
 *
 */
const calcSize = (size) => {
  if (size === "s") return "0.9rem";
  if (size === "m") return "1.15rem";
  if (size === "l") return "2rem";
  throw new Error(`Unknown size: ${size}`);
};

/**
 *
 */
const calcLineHeight = (size) => {
  if (size === "s") return 1.2;
  if (size === "m") return 1.2;
  if (size === "l") return 1;
  throw new Error(`Unknown size: ${size}`);
};

export default { calcImportance, calcLineHeight, calcSize };
