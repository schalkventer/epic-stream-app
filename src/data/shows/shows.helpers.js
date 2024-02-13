import schema from "./shows.schema";
import services from "../../services/context";
import validation from "../../utils/validation";
import { filters } from "./shows.helpers.filters";

/**
 * The basic query used when the the "browse" page is first loaded without any
 * filters. Effectively, returns all available shows in alphabetical order.
 */
const BLANK_QUERY = validation.check(
  {
    limit: 0,
    search: "",
    genre: "All",
    sorting: "A-Z",
  },
  schema.queries.list,
);

/**
 * Creates a string representation of a specific query that can be compared
 * against previous queries to in order to determine whether they are the same.
 * Note that due to the way that composite types work in JavaScript, the queries
 * need to be converted to strings (primitives) first before their values can be
 * compared.
 *
 * @param {object} query
 * @returns {string}
 */
const createListQueryKey = (query) => {
  const inner = validation.check(query, schema.queries.list);
  return `${inner.limit}-${inner.search}-${inner.genre}-${inner.sorting}`;
};

/**
 * Takes an array of `show` objects and extracts a single object with a
 * matching `id` value from the array. Note that an error will be thrown if no
 * matching `id` value is found in the array. However, this error can be caught
 * with a try/catch block if necessary.
 *
 * @param {object} props
 * @param {object[]} props.items
 * @param {string} props.id
 */
const getSingle = (props) => {
  const { id, items } = props;
  const result = items.find((item) => item.id === id);

  if (!result) {
    throw new Error(`Show with id "${id}" not found`);
  }

  return validation.check(result, schema.item);
};

/**
 * Takes an array of `show` objects and applies a specific "list" query to it. A
 * new array will be returned with only the results that match the supplied
 * query.
 *
 * Note that the `filters` module is used, by means of partial application
 * (currying) and a `reduce` function to apply each specific aspect of the query
 * in order.
 *
 * @param {object} props
 * @param {object[]} props.items
 * @param {object} props.query
 */
const applyListQuery = (props) => {
  const items = validation.check(props.items, schema.list);
  const query = validation.check(props.query, schema.queries.list);

  const { search, genre, sorting, limit } = query;

  const operations = [
    filters.createSearch(search),
    filters.createGenre(genre),
    filters.createSorting(sorting),
    filters.createLimit(limit),
  ];

  const result = operations.reduce((current, fn) => fn(current), items);
  return validation.check(result, schema.list);
};

/**
 * Takes a the identifier used on the server to indicate a specific genre, and
 * matches it against the string label for that genre. Note that the number
 * identifier start at 1, and since the labels are in an zero-indexed array the
 * number is subtracted by 1 to get the matching index in the array of labels.
 *
 * @param {number} number
 */
const convertNumberToGenre = (number) => {
  const result = schema.genre.options[number - 1];
  return validation.check(result, schema.genre);
};

/**
 *
 * Takes a single `show` preview object returned from the server and converts it
 * to the format stored in the Zustand store.
 *
 * The primary difference is `updated` being stored as a date instead of a
 * string, and the `genres` as the actual name of the genre instead of a number
 * identifier.
 *
 * @param {object[]} response
 */
const responseToItems = (response) => {
  const result = response.map((singlePreview) => {
    const inner = validation.check(singlePreview, services.schema.preview);

    return {
      ...inner,
      genres: inner.genres.map(convertNumberToGenre),
      updated: new Date(inner.date),
    };
  });

  return validation.check(result, schema.list);
};

export default {
  BLANK_QUERY,
  createListQueryKey,
  applyListQuery,
  responseToItems,
  getSingle,
};
