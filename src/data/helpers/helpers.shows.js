import schema from "../schema";
import services from "../../services";
import validate from "../../utils/validate";
import { filters } from "./helpers.shows.filters";

/**
 *
 */
export const BLANK_QUERY = validate(
  {
    limit: 0,
    search: "",
    genre: "All",
    sorting: "A-Z",
  },
  schema.shows.query,
);

/**
 * @param {object} query
 * @returns {string}
 */
export const createQueryKey = (query) => {
  const inner = validate(query, schema.shows.query);
  return `${inner.limit}-${inner.search}-${inner.genre}-${inner.sorting}`;
};

/**
 *
 * @param {object} props
 * @param {object} props.items
 * @param {object} props.query
 */
export const applyQuery = (props) => {
  const items = validate(props.items, schema.shows.list);
  const query = validate(props.query, schema.shows.query);
  const { search, genre, sorting, limit } = query;

  const operations = [
    filters.createSearch(search),
    filters.createGenre(genre),
    filters.createSorting(sorting),
    filters.createLimit(limit),
  ];

  const result = operations.reduce((current, fn) => fn(current), items);
  return validate(result, schema.shows.list);
};

const convertNumberToGenre = (number) => {
  const result = schema.shows.genre.options[number - 1];
  return validate(result, schema.shows.genre);
};

/**
 * @param {object[]} response
 */
export const responseToItems = (response) => {
  const result = response.map((singlePreview) => {
    const inner = validate(singlePreview, services.schema.preview);

    return {
      ...inner,
      genres: inner.genres.map(convertNumberToGenre),
      updated: new Date(inner.date),
    };
  });

  return validate(result, schema.shows.list);
};
