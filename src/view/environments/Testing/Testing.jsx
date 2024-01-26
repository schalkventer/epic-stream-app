import schema from "./Testing.schema";
import * as data from "../../../model/data";
import { Component as Base } from "../../components/Base";
import { context, __mocking__ } from "../../../model/services/context";

/**
 *
 */
const Inner = (props) => {
  const { children } = props;
  data.useMount();
  return <Base>{children}</Base>;
};

/**
 *
 */
export const Component = (props) => {
  const { children } = props;

  return (
    <context.Provider value={__mocking__.createServices()}>
      <Inner>{children}</Inner>
    </context.Provider>
  );
};

export default {
  Component,
};

Inner.propTypes = schema.props;
Component.propTypes = schema.props;
