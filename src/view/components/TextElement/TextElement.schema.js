import p from "prop-types";

const props = {
  children: p.node.isRequired,
  size: p.oneOf(["s", "m", "l"]),
  importance: p.oneOf(["primary", "secondary", "inherit"]),
  lines: p.number,
};

export default {
  props,
};
