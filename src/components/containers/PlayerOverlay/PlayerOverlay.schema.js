import p from "prop-types";

const wrapper = {
  id: p.string,
  isOpen: p.bool,
};

const controls = {
  id: p.string,
  show: p.string,
  toggleOpen: p.func,
  duration: p.number,
  file: p.string,
};

const props = {
  children: p.node,
};

export default {
  wrapper,
  controls,
  props,
};
