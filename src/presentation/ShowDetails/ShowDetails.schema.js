import p from "prop-types";

const props = {
  title: p.string,
  image: p.string,
  children: p.node,
  genres: p.arrayOf(p.string),
  updated: p.instanceOf(Date),
  description: p.string,
  seasons: p.number,
};

const placeholder = {
  children: p.node,
};

export default {
  props,
  placeholder,
};
