import p from "prop-types";

const props = {
  query: p.shape({
    search: p.string,
    sorting: p.string,
    genre: p.string,
  }),
};

export default {
  props,
};
