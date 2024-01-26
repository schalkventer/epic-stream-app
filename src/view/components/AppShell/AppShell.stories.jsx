import { Component } from "./AppShell";
import { PageFilters } from "./AppShell.PageFilters";
import { Component as Base } from "../Base";

export default {
  title: "components/AppShell",
  component: Component,
  tags: ["autodocs"],

  parameters: {
    layout: "fullscreen",
  },
};

export const Basic = () => (
  <Base>
    <Component>
      <>
        <PageFilters
          filters={[
            {
              label: "Search",
              value: "",
              size: "l",
            },
            {
              label: "Genres",
              value: "One",
              options: ["One", "Two", "Three"],
              size: "s",
            },
          ]}
        />

        <div>Hello World!</div>
      </>
    </Component>
  </Base>
);
