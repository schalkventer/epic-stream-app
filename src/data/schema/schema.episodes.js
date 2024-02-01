import { z } from "zod";

/**
 *
 */
export const item = z.object({
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
export const query = z.object({
  show: z.string(),
  season: z.number().min(1),
});

/**
 *
 */
export const list = z.array(item);
