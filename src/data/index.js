import { useShowsList, useSingleShow } from "./data.shows";
import { useEpisodes } from "./data.episodes";
import schema from "./schema";

export default {
  hooks: {
    useShowsList,
    useSingleShow,
    useEpisodes,
  },
  schema,
};
