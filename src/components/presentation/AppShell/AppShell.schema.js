import p from "prop-types";
import * as UserEntry from "../UserEntry";

const props = {
  children: p.node,
};

const pageFilters = {
  filters: p.arrayOf(
    p.shape({
      ...UserEntry.schema.props,
      size: p.oneOf(["s", "m", "l"]),
    }),
  ),
};

const presentation = {
  ...props,
  open: p.bool,
  toggleOpen: p.func,
};

export default {
  presentation,
  pageFilters,
  props,
};
