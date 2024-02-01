import { store } from "./schema.store";

import {
  item as episodesItem,
  list as episodesList,
  query as episodesQuery,
} from "./schema.episodes";

import {
  item as showsItem,
  list as showsList,
  query as showsQuery,
  genre,
  sorting,
} from "./schema.shows";

export default {
  store,
  episodes: {
    item: episodesItem,
    list: episodesList,
    query: episodesQuery,
  },
  shows: {
    genre,
    sorting,
    item: showsItem,
    list: showsList,
    query: showsQuery,
  },
};
