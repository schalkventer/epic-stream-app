import { Component as Testing } from "../../environments/Testing";
import { Component } from "./SingleShow";

export default {
  title: "containers/SingleShow",
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
