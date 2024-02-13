import { context, create } from "./services.context";
import { mocking } from "./services.mocking";
import http from "../http";

export default {
  context,
  mocking,
  create,
  schema: {
    preview: http.schema.preview,
    show: http.schema.fullShow,
  },
};
