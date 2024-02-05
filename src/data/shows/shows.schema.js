import { z } from "zod";

/**
 *
 */
const sorting = z.enum(["A-Z", "Z-A", "Latest", "Oldest", "Random"]);

/**
 *
 */
const genre = z.enum([
  "Crime",
  "Drama",
  "Thriller",
  "Documentary",
  "Nature",
  "War",
  "History",
  "Animation",
  "Action",
  "Adventure",
  "Science",
  "Family",
  "Biography",
  "Sport",
  "Fantasy",
  "Horror",
  "Mystery",
  "Comedy",
  "Sci-Fi",
  "Music",
  "News",
  "Talk Show",
  "Romance",
  "Game Show",
]);

/**
 *
 */
const genreWithAll = z.enum(["All", ...genre.options]);

/**
 *
 */
const item = z.object({
  id: z.string().uuid(),
  image: z.string().url(),
  title: z.string().min(1),
  seasons: z.number().min(1),
  description: z.string().min(1),
  genres: z.array(genre),
  updated: z.date(),
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
    limit: z.number().min(0).optional(),
    search: z.string(),
    genre: genreWithAll,
    sorting,
  }),

  single: z.object({
    id: z.string().uuid(),
  }),
};

/**
 *
 */
const results = {
  list: z.object({
    query: queries.list.nullable(),
    result: list.nullable(),
    change: z.function().args(queries.list),
  }),

  single: z.object({
    id: z.string().nullable(),
    result: item.nullable(),
    change: z.function().args(z.string()),
  }),
};

export default {
  item,
  queries,
  list,
  sorting,
  genre,
  genreWithAll,
  results,
};
