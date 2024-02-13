import p from "prop-types";

const props = {
  onStart: p.func,
  progress: p.number,
  total: p.number,
  image: p.string,
  title: p.string,
  subtitle: p.string,
};

export default {
  props,
};
