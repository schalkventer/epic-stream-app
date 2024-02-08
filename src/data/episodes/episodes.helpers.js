import { z } from "zod";
import { uniq } from "lodash";
import schema from "./episodes.schema";
import services from "../../services";
import validate from "../../utils/validate";

const convert = {
  /**
   *
   * @param {object} props
   * @param {string} props.episode
   * @param {string} props.show
   */
  toId: (props) => `${props.show}_${props.episode}`,

  /**
   *
   * @param {string} props
   */
  toProperties: (props) => {
    const [show, episode] = props.split("_").map((inner) => inner.trim());
    return { show, episode };
  },
};

/**
 * @param {object} props
 * @param {object[]} props.items
 * @param {string} props.id
 */
const getSingle = (props) => {
  const { id, items } = props;
  const result = items.find((inner) => inner.id === id) || false;
  return validate(result, schema.itemOrFalse);
};

/**
 * @param {object} response
 */
const responseToItems = (response) => {
  const { id, seasons } = validate(response, services.schema.show);

  const result = seasons.map((singleSeason) =>
    singleSeason.episodes.map((singleEpisode) => ({
      ...singleEpisode,
      id: convert.toId({ show: id, episode: singleEpisode.id }),
      updated: new Date(singleEpisode.date.toString()),
      season: singleSeason.season,
      progress: 0,
    })),
  );

  return validate(result.flat(), schema.list);
};

/**
 * @param {object} props
 * @param {object[]} props.items
 * @param {string} props.show
 * @param {number} props.season
 */
const applySeasonFilter = (props) => {
  const items = validate(props.items, schema.list);
  const { season, show } = props;

  const result = items.filter((singleItem) => {
    const { show: inner } = convert.toProperties(singleItem.id);
    if (inner !== show) return false;
    return singleItem.season === season;
  });

  return validate(result, schema.list);
};

/**
 * @param {object} props
 * @param {object} props.items
 * @param {string[]} props.query
 */
const applyListFilter = (props) => {
  const { query } = props;
  const items = validate(props.items, schema.list);
  const result = items.map((inner) => query.includes(inner.id));
  return validate(result.flat(), schema.list);
};

/**
 *
 * @param {string[]} query
 */
const calcShowsToFetch = (query) => {
  const inner = validate(query, schema.queries.list);

  const result = inner.map((single) => {
    const { show } = convert.toProperties(single);
    return show;
  });

  return validate(uniq(result), z.array(z.string()));
};

export default {
  getSingle,
  responseToItems,
  applySeasonFilter,
  applyListFilter,
  calcShowsToFetch,
  convert,
};
