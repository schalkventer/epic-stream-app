import p from "prop-types";
import * as Button from "../Button";

const props = {
  children: p.node.isRequired,
  actions: p.arrayOf(p.shape(Button.schema.props)),
  title: p.string,
};

export default {
  props,
};
