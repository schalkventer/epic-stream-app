import { getFullShow, getPreviews } from "./http.api";
import { fullShow, preview } from "./http.schema";

export default {
  api: {
    getFullShow,
    getPreviews,
  },
  schema: {
    fullShow,
    preview,
  },
};
