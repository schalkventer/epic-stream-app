import { z } from "zod";

/**
 * A unique ID associated with an episode's progress.
 *
 * Note that this is a combination of both the show and episode ID as a single
 * string, separated by an underscore (`_`). The reason for this is that often
 * times both the unique identifier and the associated show are required
 * together when referencing an episode.
 */
const id = z.string();

/**
 * A percentage value used to indicate how much a user has watched for a
 * specific show. If you want to convert this to seconds or vice-versa then use
 * the `convert` methods in the `helpers` file.
 */
const percentage = z.number().min(0).max(100);

/**
 * An object of key-value pairs where the keys are episode IDs and the values
 * are the progress percentage. Note that if a episode is not in the object (by
 * not having a key) then it is assumed to be at 0% watched.
 */
const list = z.record(id, percentage);

/**
 * Various responses that are associated with hooks in the `hooks` file.
 */
const results = {
  local: z.object({
    actions: z.object({
      get: z.function().returns(list),
      clear: z.function().returns(list),
      update: z
        .function()
        .args(
          z.object({
            id,
            percentage,
          }),
        )
        .returns(list),
    }),
  }),

  single: z.object({
    query: id.nullable(),
    change: z.function().args(id),
    result: percentage.nullable(),
  }),
};

export default {
  results,
  list,
};
