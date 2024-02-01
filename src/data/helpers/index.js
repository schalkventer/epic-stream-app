import {
  BLANK_QUERY,
  applyQuery as showsApplyQuery,
  responseToItems as showsResponseToItems,
  createQueryKey,
} from "./helpers.shows";

import {
  responseToItems as episodesResponseToItems,
  applyQuery as episodesApplyQuery,
} from "./helpers.episodes";

export default {
  shows: {
    createQueryKey,
    BLANK_QUERY,
    applyQuery: showsApplyQuery,
    responseToItems: showsResponseToItems,
  },
  episodes: {
    responseToItems: episodesResponseToItems,
    applyQuery: episodesApplyQuery,
  },
};
