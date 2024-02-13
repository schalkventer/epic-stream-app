import p from "prop-types";

const list = {
  show: p.string,
  season: p.number,
};

const item = {
  id: p.string,
  image: p.string,
  title: p.string,
  subtitle: p.string,
  description: p.string,
  onClick: p.func,
};

const props = {
  id: p.string,
};

export default {
  props,
  list,
  item,
};
