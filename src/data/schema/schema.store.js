import { z } from "zod";
import { list as showsList } from "./schema.shows";
import { list as episodesList } from "./schema.episodes";

/**
 *
 */
export const store = z.object({
  shows: showsList.optional(),
  episodes: episodesList,
  favourites: episodesList.optional(),
  player: z.string().uuid().nullish(),
});
