import { Component as Base } from "../Base";
import { Component } from "./ProgressLine";

export default {
  title: "components/ProgressLine",
  component: Component,
  tags: ["autodocs"],
};

export const Basic = () => (
  <Base>
    <Component percentage={30} />
  </Base>
);
