import { z } from "zod";

/**
 *
 */
export const sorting = z.enum(["A-Z", "Z-A", "Latest", "Oldest", "Random"]);

/**
 *
 */
export const genre = z.enum([
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
export const item = z.object({
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
export const query = z.object({
  limit: z.number().min(0),
  search: z.string(),
  genre: genreWithAll,
  sorting,
});

export const list = z.array(item);
