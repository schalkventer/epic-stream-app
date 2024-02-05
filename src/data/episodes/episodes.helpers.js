import schema from "./episodes.schema";
import services from "../../services";
import validate from "../../utils/validate";

/**
 *
 * @param {object} query
 * @returns {string}
 */
const createListQueryKey = (query) => {
  const inner = validate(query, schema.queries.list);
  return `${inner.show}-${inner.season}`;
};

/**
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

  return validate(result, schema.item);
};

/**
 * @param {object} response
 */
const responseToItems = (response) => {
  const { id, seasons } = validate(response, services.schema.show);

  const result = seasons.map((singleSeason) =>
    singleSeason.episodes.map((singleEpisode) => ({
      ...singleEpisode,
      updated: new Date(singleEpisode.date.toString()),
      season: singleSeason.season,
      progress: 0,
      show: id,
    })),
  );

  return validate(result.flat(), schema.list);
};

/**
 *
 * @param {object} props
 * @param {object} props.items
 * @param {object} props.query
 */
const applyQuery = (props) => {
  const items = validate(props.items, schema.list);
  const query = validate(props.query, schema.queries.list);

  const { season, show } = query;

  const filtered = items.filter((item) => {
    if (item.show !== show) return false;
    if (item.season !== season) return false;
    return true;
  });

  const result = filtered.sort((a, b) => a.episode - b.episode);
  return validate(result, schema.list);
};

export default {
  createListQueryKey,
  getSingle,
  responseToItems,
  applyQuery,
};
