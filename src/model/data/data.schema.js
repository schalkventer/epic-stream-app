import { z } from "zod";
import { createWithDev } from "zod-dev";

// @ts-ignore
const isDev = import.meta.env.MODE !== "production";

const withDev = createWithDev(isDev);

/**
 *
 */
const episode = z.object({
  id: z.string().uuid(),
  show: z.string().uuid(),
  title: z.string().min(1),
  episode: z.number().min(1),
  season: z.number().min(1),
  date: z.number().min(0),
  image: z.string().url(),
  file: z.string().url(),
  progress: z.number().min(0).max(100),
});

/**
 *
 */
const show = z.object({
  id: z.string().uuid(),
  image: z.string().url(),
  title: z.string().min(1),
  seasons: z.number().min(1),
  description: z.string().min(1),
  genres: z.array(z.number().min(1).max(24)),
  updated: z.date(),
});

/**
 *
 */
const store = z.object({
  shows: z.array(show),
  episodes: z.array(episode),
  favourites: z.array(episode),
  player: z.string().uuid().nullable(),
});

/**
 *
 */
const local = z.object({
  favourites: z.array(episode),
});

export default {
  episode,
  local,
  show,
  store,
  withDev,
};
