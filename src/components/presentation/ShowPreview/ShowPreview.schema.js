import p from "prop-types";

const props = {
  title: p.string,
  image: p.string,
  genres: p.arrayOf(p.string),
  updated: p.instanceOf(Date),
};

export default {
  props,
};
