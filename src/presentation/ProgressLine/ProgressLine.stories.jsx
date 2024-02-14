import { Component as Testing } from "../../services/Testing";
import { Component } from "./ProgressLine";

export default {
  title: "components/ProgressLine",
  component: Component,
  tags: ["autodocs"],
};

export const Basic = () => (
  <Testing>
    <Component percentage={30} />
  </Testing>
);
