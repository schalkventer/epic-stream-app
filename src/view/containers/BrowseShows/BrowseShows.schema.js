import p from "prop-types";
import * as ShowPreview from "../../components/ShowPreview";

export const presentation = {
  phase: p.oneOf(["LOADING", "IDLE", "ERROR"]),
  list: p.arrayOf(ShowPreview.schema.props),
};

export default {
  presentation,
};
