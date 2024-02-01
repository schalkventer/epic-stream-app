import p from "prop-types";

const props = {
  title: p.string,
  image: p.string,
  genres: p.arrayOf(p.string),
  updated: p.instanceOf(Date),
  action: p.oneOfType([p.func, p.string]),
};

export default {
  props,
};
