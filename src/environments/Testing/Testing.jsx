import { Fragment } from "react";
import { createProvider } from "./Testing.createProvider";
import schema from "./Testing.schema";
import { Component as AppShell } from "../../presentation/AppShell";
import { Component as Base } from "../../presentation/Base";

/**
 *
 */
export const Component = (props) => {
  const { children, variant, mocking } = props;
  const Provider = createProvider(mocking);
  const Wrapper = variant === "shell" ? AppShell : Fragment;

  return (
    <Provider>
      <Base>
        <Wrapper>{children}</Wrapper>
      </Base>
    </Provider>
  );
};

Component.propTypes = schema.props;
