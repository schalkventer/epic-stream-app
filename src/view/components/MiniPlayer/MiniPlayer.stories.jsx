import { Component } from "./MiniPlayer";
import { Component as Base } from "../Base";

export default {
  title: "components/MiniPlayer",
  component: Component,
};

export const Basic = () => (
  <Base>
    <Component />
  </Base>
);
