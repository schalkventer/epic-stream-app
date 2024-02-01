import p from "prop-types";

const props = {
  title: p.string.isRequired,
  subtitle: p.string,
  image: p.string.isRequired,
  percentage: p.number.isRequired,
  onClick: p.func,
};

export default {
  props,
};
