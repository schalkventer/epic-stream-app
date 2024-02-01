import p from "prop-types";

const props = {
  url: p.string,
  variant: p.oneOf(["default", "shell"]),
  children: p.node.isRequired,
};

export default {
  props,
};
