import { getFullShow, getPreviews } from "./http";
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
