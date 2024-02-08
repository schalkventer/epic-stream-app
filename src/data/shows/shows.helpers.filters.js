import { shuffle } from "lodash";
import Fuse from "fuse.js";
import schema from "./shows.schema";
import validate from "../../utils/validate";

/**
 * A collection of higher-order functions that accept query-specific values and
 * return a new function that takes an array and performs the query on the array
 * (filtering all items that do not match the query).
 *
 * This pattern allows the creation of all queries in an array and the items to
 * be piped through the array one by one by means of a reduce function.
 */
export const filters = {
  /**
   *
   * @param {string} value
   */
  createSorting: (value) => (items) => {
    const inner = validate(items, schema.list);
    const sorting = validate(value, schema.sorting);

    if (sorting === "Random") return shuffle(inner);

    const result = inner.sort((a, b) => {
      switch (sorting) {
        case "Z-A":
          return b.title.localeCompare(a.title);

        case "Latest":
          return b.updated.getTime() - a.updated.getTime();

        case "Oldest":
          return a.updated.getTime() - b.updated.getTime();

        default:
          return a.title.localeCompare(b.title);
      }
    });

    return validate(result, schema.list);
  },

  /**
   *
   * @param {number} value
   */
  createLimit: (amount) => (items) => {
    const inner = validate(items, schema.list);
    if (amount < 1) return inner;
    return items.slice(0, amount);
  },

  /**
   *
   * @param {string} value
   */
  createSearch: (value) => (items) => {
    const inner = validate(items, schema.list);

    const fuse = new Fuse(inner, {
      minMatchCharLength: 3,
      keys: [{ name: "title", weight: 3 }, "description", "genres"],
    });

    if (value.length < 3) return items;
    const result = fuse.search(value).map(({ item }) => item);
    return validate(result, schema.list);
  },

  /**
   *
   * @param {string} genre
   * @returns
   */
  createGenre: (genre) => (items) => {
    const inner = validate(items, schema.list);
    if (genre === "All") return inner;

    const result = inner.filter((item) => item.genres.includes(genre));
    return validate(result, schema.list);
  },
};
