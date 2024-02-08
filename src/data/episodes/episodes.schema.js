import { z } from "zod";

/**
 *
 */
const id = z.string();

/**
 *
 */
const item = z.object({
  id,
  title: z.string().min(1),
  episode: z.number().min(1),
  season: z.number().min(1),
  updated: z.date(),
  image: z.string().url(),
  file: z.string().url(),
  description: z.string(),
  duration: z.number(),
});

/**
 *
 */
const itemOrFalse = z.union([item, z.literal(false)]);

/**
 *
 */
const list = z.array(item);

/**
 *
 */
const queries = {
  season: z.object({
    show: z.string().min(1),
    season: z.number().min(1),
  }),

  list: z.array(id),
  single: id,
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

  season: z.object({
    result: list.nullable(),
    query: queries.season.nullable(),
    change: z.function().args(queries.season),
  }),

  single: z.object({
    result: itemOrFalse.nullable(),
    query: queries.single.nullable(),
    change: z.function().args(queries.single),
  }),

  player: z.object({
    id: z.string().min(1).nullable(),
    status: z.enum(["playing", "stopped"]),
    toggle: z.function().args(z.string()).optional(),
  }),
};

export default {
  item,
  results,
  queries,
  list,
  itemOrFalse,
};
