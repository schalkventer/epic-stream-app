import { faker as f } from "@faker-js/faker";
import { uniq } from "lodash";
import http from "./http";

/**
 * An asynchronous helper function that can be used to simulate network latency
 * when testing behaviour in the codebase.
 */
const delay = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(undefined), 1000);
  });

/**
 * Creates a stand-in mock for local storage. This simply stores the state in
 * memory, meaning that no data is persisted between tests.
 *
 * Note that the response object is frozen to prevent accidentally mutating
 * (since this is not possible with real local storage.)
 */
const createLocal = () => {
  let store = {
    favourites: {},
    progress: {},
  };

  return {
    setSavedStore: (newState) => {
      store = { ...store, ...newState };
    },

    getSavedStore: () => Object.freeze({ ...store }),
  };
};

/**
 * Creates a random preview object that represents the a single show preview
 * returned from the server. Note that the response is validated to ensure that
 * it matches the actual declared schema.
 *
 * @param {string} [id] - An optional ID value that can be used instead of
 * automatically generating one. This is useful if you want to look for the
 * presence of a specific item when testing.
 */
const createPreview = (id) =>
  http.schema.preview.parse({
    id: id || f.string.uuid(),
    description: f.lorem.paragraphs(3),
    image: f.image.urlPicsumPhotos(),
    seasons: f.number.int({ min: 1, max: 5 }),
    date: f.date.past().toISOString(),

    title: f.datatype.boolean()
      ? f.lorem.words({ min: 8, max: 14 })
      : f.lorem.words({ min: 1, max: 4 }),

    genres: uniq(
      f.helpers.multiple(() => f.number.int({ min: 1, max: 24 }), {
        count: f.number.int({ min: 1, max: 6 }),
      }),
    ),
  });

/**
 * Creates a random full show object that is received from the server when
 * requesting information about a specific single show. Note that the response
 * is validated to ensure that it matches the actual declared schema.
 *
 * Note that the only difference between this and the `preview` object is that
 * instead of merely listing the number of seasons as a number, it actually
 * contains an array of seasons with all show information embedded inside. For
 * this reason, a preview is created first and then an array of equal length is
 * populated based on the amount of seasons returned
 *
 * @param {object} [props]
 *
 * @param {string} [props.show] - An optional show ID value that can be used
 * instead of automatically generating one. This is useful if you want to look
 * for the presence of a specific item when testing.
 *
 * @param {string} [props.episode] - An optional episode ID value that can be
 * used instead of automatically generating one. Note that if supplied, then the
 * first episode of the first season for the show will be assigned the supplied
 * ID.
 */
const createFullShow = (props) => {
  const { episode, show } = props;
  const { seasons, ...other } = createPreview(show);

  const emptySeasons = new Array(seasons)
    .fill(1)
    .map((value, index) => value + index);

  return {
    ...other,
    seasons: emptySeasons.map((count) => ({
      id: f.string.uuid(),
      season: count,

      episodes: new Array(f.number.int({ min: 3, max: 20 }))
        .fill(null)
        .map((__, innerIndex) => ({
          id: (count === 1 && innerIndex === 1 && episode) || f.string.uuid(),

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
 * A factory function that creates the entire mocked service object passed to
 * React context. Note that to ensure consistency with the actual services
 * factory function, this is also exposed as a factory function.
 *
 * Similar to the individual mocking functions hardcoded `show` and/or `episode`
 * ID values can be passed to force specific items to be present in the test
 * responses.
 *
 * See the individual mocking functions for more information.
 *
 * @param {object} [props]
 *
 * @param {string} [props.show] - An optional show ID value that can be used
 * instead of automatically generating one. This is useful if you want to look
 * for the presence of a specific item when testing.
 *
 * @param {string} [props.episode] - An optional episode ID value that can be
 * used instead of automatically generating one. Note that if supplied, then the
 * first episode of the first season for the show will be assigned the supplied
 * ID.
 */
export const mocking = (props) => ({
  local: createLocal(),

  http: {
    getPreviews: async () => {
      await delay();

      return [
        createPreview(props.show),
        ...f.helpers.multiple(() => createPreview(), {
          count: 80,
        }),
      ];
    },

    getFullShow: async () => {
      await delay();
      return createFullShow(props);
    },
  },
});
