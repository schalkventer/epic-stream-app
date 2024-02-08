import p from "prop-types";

const inner = {
  id: p.string,
  isOpen: p.bool,
};

const props = {
  children: p.node,
};

export default {
  inner,
  props,
};
