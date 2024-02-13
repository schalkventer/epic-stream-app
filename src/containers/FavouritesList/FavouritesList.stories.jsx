import { Component as Testing } from "../../environments/Testing";
import { Component } from "./FavouritesList";

export default {
  title: "containers/FavouritesList",
  component: Component,
  parameters: {
    layout: "fullscreen",
  },
};

export const Basic = () => (
  <Testing>
    <Component />
  </Testing>
);
