import { Component as Testing } from "../../services/Testing";
import { Component } from "./FeaturedShows";

export default {
  title: "containers/FeaturedShows",
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
