import { useMount } from "react-use";
import styled from "@emotion/styled";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import schema from "./Production.schema";
import { Component as TextElement } from "../../presentation/TextElement";
import { Component as OverlayContent } from "../../presentation/OverlayContent";
import { Component as Base } from "../../presentation/Base";
import services from "../context";

const Content = styled.div`
  padding: 2rem;
`;

/**
 *
 */
const ErrorAlert = () => (
  <Base>
    <OverlayContent
      title="Error"
      primary={{ label: "Refresh", action: () => window.location.reload() }}
    >
      <Content>
        <TextElement>
          A critical error was encountered while running Epic Stream. Please
          refresh the current page to see if it resolves the problem. If the
          issue persists after a hard refresh please contact support at
          support@epic-stream.app
        </TextElement>
      </Content>
    </OverlayContent>
  </Base>
);

/**
 *
 */
export const Component = (props) => {
  const { children } = props;

  useMount(() => {
    window.console.log = () => {};
  });

  return (
    <ErrorBoundary fallback={<ErrorAlert />}>
      <BrowserRouter>
        <services.context.Provider value={services.create()}>
          <Base>{children}</Base>
        </services.context.Provider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default {
  Component,
};

Component.propTypes = schema.props;
