import { z } from "zod";

/**
 * A unique ID associated with a favourited episode.
 *
 * Note that this is a combination of both the show and episode ID as a single
 * string, separated by an underscore (`_`). The reason for this is that often
 * times both the unique identifier and the associated show are required
 * together when referencing an episode.
 */
const id = z.string();

/**
 * A date value used to indicate when something was added as a favourite.
 */
const added = z.date();

/**
 * An object of key-value pairs where the keys are episode IDs and the values
 * are teh date they were added as favourites. Note that if a episode is not in
 * the object (by not having a key) then it is assumed that it is not
 * favourited.
 */
const list = z.record(id, added);

/**
 * A string value that determines the order in which the episodes are returned.
 * Note that `Latest` and `Oldest` are based on the `added` property of the
 * `list` object and not the `updated` value in the episode itself.
 */
const query = z.enum(["Latest", "Oldest", "A-Z", "Z-A"]);

/**
 * Various responses that are associated with hooks in the `hooks` file.
 */
const results = {
  list: list.nullable(),
  toggle: z.function().args(z.string()),

  local: z.object({
    actions: z.object({
      get: z.function().returns(list),
      add: z.function().args(z.string).returns(list),
      remove: z.function().args(id).returns(list),
      clear: z.function().returns(list),
    }),
  }),

  single: z.object({
    query: id.nullable(),
    change: z.function().args(id),
    result: z.union([added, z.literal(false)]).nullable(),
  }),
};

export default {
  results,
  query,
  list,
};
