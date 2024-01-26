import p from "prop-types";

const props = {
  label: p.string,
  icon: p.node,
  importance: p.oneOf(["primary", "secondary"]),
  action: p.oneOfType([p.func, p.string, p.bool]),
};

export default {
  props,
};
