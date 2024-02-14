import p from "prop-types";

const props = {
  variant: p.oneOf(["default", "shell"]),
  children: p.node.isRequired,
  mocking: p.shape({
    show: p.string,
    episode: p.string,
  }),
};

export default {
  props,
};
