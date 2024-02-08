import { z } from "zod";

/**
 *
 */
export const preview = z.object({
  id: z.string(),
  description: z.string(),
  title: z.string(),
  image: z.string(),
  genres: z.array(z.number().min(1).max(24)),
  seasons: z.number(),
  date: z.string(),
});

/**
 *
 */
export const fullShow = z.object({
  id: z.string(),
  description: z.string(),
  title: z.string(),
  image: z.string(),
  genres: z.array(z.number().min(1).max(24)),
  seasons: z.array(
    z.object({
      id: z.string(),
      season: z.number(),
      episodes: z.array(
        z.object({
          id: z.string(),
          title: z.string(),
          episode: z.number(),
          description: z.string(),
          date: z.string(),
          image: z.string(),
          file: z.string(),
          duration: z.number(),
        }),
      ),
    }),
  ),
});
