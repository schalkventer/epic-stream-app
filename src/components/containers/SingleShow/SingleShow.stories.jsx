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
  <Testing variant="shell">
    <Component id="bfe26e23-13d0-4ed6-8701-3b1a160a6623" />
  </Testing>
);
