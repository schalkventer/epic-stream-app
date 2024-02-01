import p from "prop-types";

const props = {
  variant: p.oneOf(["default", "shell"]),
  children: p.node.isRequired,
};

export default {
  props,
};
