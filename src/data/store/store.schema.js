import { z } from "zod";
import shows from "../shows/shows.schema";
import episodes from "../episodes/episodes.schema";

/**
 *
 */
export const schema = z.object({
  shows: shows.list.optional(),
  episodes: episodes.list,
  favourites: episodes.list.optional(),

  player: z.object({
    id: z.string().uuid().nullable(),
    status: z.enum(["playing", "stopped"]),
  }),
});
