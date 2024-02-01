import schema from "../schema";
import services from "../../services";
import validate from "../../utils/validate";

/**
 * @param {object} response
 */
export const responseToItems = (response) => {
  const { id, seasons } = validate(response, services.schema.show);

  const result = seasons.map((singleSeason) =>
    singleSeason.episodes.map((singleEpisode) => ({
      ...singleEpisode,
      updated: new Date(singleEpisode.date.toString()),
      show: id,
    })),
  );

  return validate(result.flat(), schema.episodes.list);
};

/**
 *
 * @param {object} props
 * @param {object} props.items
 * @param {object} props.query
 */
export const applyQuery = (props) => {
  const items = validate(props.items, schema.episodes.list);
  const query = validate(props.query, schema.episodes.query);

  const { season, show } = query;

  const filtered = items.filter((item) => {
    if (item.show !== show) return false;
    if (item.season !== season) return false;
    return true;
  });

  const result = filtered.sort((a, b) => a.episode - b.episode);
  return validate(result, schema.episodes.list);
};
