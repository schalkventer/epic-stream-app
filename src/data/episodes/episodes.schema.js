import { z } from "zod";

/**
 *
 */
const item = z.object({
  id: z.string().uuid(),
  show: z.string().uuid(),
  title: z.string().min(1),
  episode: z.number().min(1),
  season: z.number().min(1),
  updated: z.date(),
  image: z.string().url(),
  file: z.string().url(),
  progress: z.number().min(0).max(100),
  description: z.string(),
});

/**
 *
 */
const list = z.array(item);

/**
 *
 */
const queries = {
  list: z.object({
    show: z.string().min(1),
    season: z.number().min(1),
  }),

  single: z.object({
    show: z.string().min(1),
    id: z.string().min(1),
  }),
};

/**
 *
 */
const results = {
  list: z.object({
    result: list.nullable(),
    query: queries.list.nullable(),
    change: z.function().args(queries.list),
  }),

  single: z.object({
    result: item.nullable(),
    query: queries.single.nullable(),
    change: z.function().args(queries.single),
  }),
};

export default {
  item,
  results,
  queries,
  list,
};
