import { faker as f } from "@faker-js/faker";
import { uniq } from "lodash";

/**
 *
 */
const delay = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(undefined), 1000);
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
  date: f.date.past().toISOString(),

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
const createFullShow = (show) => {
  const { seasons, ...other } = createPreview();

  const emptySeasons = new Array(seasons)
    .fill(1)
    .map((value, index) => value + index);

  return {
    ...other,
    id: show,
    seasons: emptySeasons.map((count) => ({
      id: f.string.uuid(),
      season: count,

      episodes: new Array(f.number.int({ min: 3, max: 20 }))
        .fill(null)
        .map((__, innerIndex) => ({
          id:
            count === 1 && innerIndex === 1
              ? "55ef4ea2-a739-4e6e-999e-3a69962b2e37"
              : f.string.uuid(),

          episode: innerIndex + 1,
          description: f.lorem.paragraphs(3),
          date: f.date.past().toISOString(),
          image: f.image.urlPicsumPhotos(),
          file: f.internet.url(),
          duration: 12,

          title: f.datatype.boolean()
            ? f.lorem.words({ min: 8, max: 14 })
            : f.lorem.words({ min: 1, max: 4 }),
        })),
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

      return [
        {
          ...createPreview(),
          id: "bfe26e23-13d0-4ed6-8701-3b1a160a6623",
        },
        ...f.helpers.multiple(() => createPreview(), {
          count: 80,
        }),
      ];
    },

    getFullShow: async (show) => {
      await delay();
      return createFullShow(show);
    },
  },
});
