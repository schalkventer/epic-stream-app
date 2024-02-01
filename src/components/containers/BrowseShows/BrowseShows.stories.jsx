import { Component as Testing } from "../../environments/Testing";
import { Component } from "./BrowseShows";

export default {
  title: "containers/BrowseShows",
  component: Component,
  parameters: {
    layout: "fullscreen",
  },
};

export const Basic = () => (
  <Testing variant="shell">
    <Component />
  </Testing>
);
