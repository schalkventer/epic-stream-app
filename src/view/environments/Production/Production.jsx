import { ErrorBoundary } from "react-error-boundary";
import { Dialog } from "@mui/material";
import schema from "./Production.schema";
import * as data from "../../../model/data";
import { Component as Base } from "../../components/Base";
import { context, createServices } from "../../../model/services/context";

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
 * @returns
 */
const ErrorAlert = () => (
  <Dialog open>
    <div>Oops</div>
  </Dialog>
);

/**
 *
 */
export const Component = (props) => {
  const { children } = props;

  return (
    <ErrorBoundary fallback={<ErrorAlert />} onError={console.log}>
      <context.Provider value={createServices()}>
        <Inner>{children}</Inner>
      </context.Provider>
    </ErrorBoundary>
  );
};

export default {
  Component,
};

Inner.propTypes = schema.props;
Component.propTypes = schema.props;
