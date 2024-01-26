import { z } from "zod";

const preview = z.object({
  id: z.string(),
  description: z.string(),
  title: z.string(),
  image: z.string(),
  genres: z.array(z.number()),
  seasons: z.number(),
  date: z.string(),
});

const fullShow = z.object({
  id: z.string(),
  description: z.string(),
  title: z.string(),
  image: z.string(),
  genres: z.array(z.number()),
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
        }),
      ),
    }),
  ),
});

export default {
  preview,
  fullShow,
};
