import { z } from "zod";
import { request } from "./http.helpers";
import schema from "./http.schema";

export const module = {
  /**
   * @param {string} id
   */
  getFullShow: async (id) => {
    const response = await request(`show/${id}`);
    return schema.fullShow.parse(response);
  },

  /**
   *
   */
  getPreviews: async () => {
    const response = await request("");
    return z.array(schema.preview).parse(response);
  },
};

export default {
  module,
};
