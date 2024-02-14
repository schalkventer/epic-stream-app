import { Component } from "./AppShell";
import { PageFilters } from "./AppShell.PageFilters";
import { Component as Testing } from "../../services/Testing";

export default {
  title: "components/AppShell",
  component: Component,
  tags: ["autodocs"],

  parameters: {
    layout: "fullscreen",
  },
};

export const Basic = () => (
  <Testing>
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
  </Testing>
);
