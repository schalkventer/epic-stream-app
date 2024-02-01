import p from "prop-types";

const button = p.shape({
  children: p.string.isRequired,
  action: p.func.isRequired,
});

const props = {
  children: p.node.isRequired,
  onClose: p.func,
  title: p.string,
  primary: button,
  secondary: button,
};

export default {
  props,
};
