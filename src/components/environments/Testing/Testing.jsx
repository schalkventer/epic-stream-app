import { MemoryRouter } from "react-router-dom";
import schema from "./Testing.schema";
import { Component as AppShell } from "../../presentation/AppShell";
import { Component as Base } from "../../presentation/Base";
import services from "../../../services";

/**
 *
 */
export const Component = (props) => {
  const { children, variant } = props;

  if (variant === "shell") {
    return (
      <MemoryRouter>
        <services.context.Provider value={services.mocking}>
          <Base>
            <AppShell>{children}</AppShell>
          </Base>
        </services.context.Provider>
      </MemoryRouter>
    );
  }

  return (
    <MemoryRouter>
      <services.context.Provider value={services.mocking}>
        <Base>{children}</Base>
      </services.context.Provider>
    </MemoryRouter>
  );
};

export default {
  Component,
};

Component.propTypes = schema.props;
