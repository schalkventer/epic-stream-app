import { useShows } from "./data.shows";
import { useEpisodes } from "./data.episodes";
import schema from "./schema";

export default {
  hooks: {
    useShows,
    useEpisodes,
  },
  schema,
};
