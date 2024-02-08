import { z } from "zod";
import shows from "../shows/shows.schema";
import episodes from "../episodes/episodes.schema";
import progress from "../progress/progress.schema";
import favourites from "../favourites/favourites.schema";

/**
 *
 */
export const schema = z.object({
  shows: shows.list.optional(),
  episodes: episodes.list,
  favourites: favourites.list.optional(),
  progress: progress.list,

  player: z.object({
    id: z.string().uuid().nullable(),
    status: z.enum(["playing", "stopped"]),
  }),
});
