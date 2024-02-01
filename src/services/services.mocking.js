import { faker as f } from "@faker-js/faker";
import { uniq } from "lodash";

/**
 *
 */
const delay = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(undefined), 1500);
  });

/**
 *
 */
const createLocal = () => ({
  setSavedStore: () => undefined,
  getSavedStore: () => ({ favourites: [] }),
});

/**
 *
 */
const createPreview = () => ({
  id: f.string.uuid(),
  description: f.lorem.paragraphs(3),
  image: f.image.urlPicsumPhotos(),
  seasons: f.number.int({ min: 1, max: 5 }),
  date: f.date.past(),

  title: f.datatype.boolean()
    ? f.lorem.words({ min: 8, max: 14 })
    : f.lorem.words({ min: 1, max: 4 }),

  genres: uniq(
    f.helpers.multiple(() => f.number.int({ min: 1, max: 24 }), {
      count: f.number.int({ min: 1, max: 3 }),
    }),
  ),
});

/**
 *
 */
const createFullShow = () => {
  const { seasons, ...other } = createPreview();

  const emptySeasons = new Array(seasons)
    .fill(1)
    .map((value, index) => value + index);

  return {
    ...other,
    seasons: emptySeasons.map((count) => ({
      id: f.string.uuid(),
      season: count,

      episodes: new Array(f.number.int({ min: 3, max: 20 })).map(
        (__, innerIndex) => ({
          id: f.string.uuid(),
          episode: innerIndex + 1,
          description: f.lorem.paragraphs(3),
          date: f.date.past(),
          image: f.image.urlPicsumPhotos(),
          file: f.internet.url(),

          title: f.datatype.boolean()
            ? f.lorem.words({ min: 8, max: 14 })
            : f.lorem.words({ min: 1, max: 4 }),
        }),
      ),
    })),
  };
};

/**
 *
 */
export const mocking = () => ({
  local: createLocal(),

  http: {
    getPreviews: async () => {
      await delay();
      return f.helpers.multiple(() => createPreview(), {
        count: 80,
      });
    },

    getFullShow: async () => {
      await delay();
      return createFullShow();
    },
  },
});
