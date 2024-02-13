import { z } from "zod";
import { request } from "./http.helpers";
import { fullShow, preview } from "./http.schema";

/**
 * @param {string} id
 */
export const getFullShow = async (id) => {
  const response = await request(`show/${id}`);
  return fullShow.parse(response);
};

/**
 *
 */
export const getPreviews = async () => {
  const response = await request("");
  return z.array(preview).parse(response);
};
