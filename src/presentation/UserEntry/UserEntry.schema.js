import p from "prop-types";

const props = {
  label: p.string.isRequired,
  value: p.string.isRequired,
  onChange: p.func.isRequired,
  identifier: p.string,
  options: p.arrayOf(p.string),
};

export default {
  props,
};
