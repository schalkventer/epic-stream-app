import p from "prop-types";

const props = {
  title: p.string,
  image: p.string,
  genres: p.arrayOf(p.string),
};

export default {
  props,
};
