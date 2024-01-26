import { z } from "zod";
import { useContext } from "react";
import { context } from "../services/context";
import schema from "./data.schema";

export const useEndpoints = () => {
  const services = useContext(context);

  /**
   *
   */
  const getPreviewsList = async () => {
    const response = await services.http.getPreviews();

    const result = response.map((singlePreview) => {
      const inner = schema.show.parse({
        ...singlePreview,
        updated: new Date(singlePreview.date),
      });

      return inner;
    });

    return z.array(schema.show).parse(result);
  };

  /**
   *
   */
  const getEpisodes = async (showId) => {
    const response = await services.http.getFullShow(showId);

    const nested = response.seasons.map((singleSeason) =>
      singleSeason.episodes.map((singleEpisode) =>
        schema.episode.parse({
          ...singleEpisode,
          updated: new Date(singleEpisode.updated),
          show: response.id,
        }),
      ),
    );

    return z.array(schema.episode).parse(nested.flat());
  };

  /**
   * @param {object | null} value
   */
  const setLocal = (value) => {
    if (!value) throw new Error("Invalid value");
    services.local.setSavedStore(value);
  };

  /**
   *
   */
  const getLocal = () => {
    const response = services.local.getSavedStore();

    if (!response) {
      const blank = schema.store
        .pick({ favourites: true })
        .parse({ favourites: [] });

      setLocal(blank);
      return blank;
    }

    return schema.local.parse(response);
  };

  return {
    getPreviewsList,
    getEpisodes,
    setLocal,
    getLocal,
  };
};

export default {
  useEndpoints,
};
