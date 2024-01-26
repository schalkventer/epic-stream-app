import { Close } from "@mui/icons-material";
import { Component } from "./Button";
import { Component as Base } from "../Base";

export default {
  title: "components/Button",
  component: Component,
  tags: ["autodocs"],
};

export const Basic = () => (
  <Base>
    <Component label="Hello World" />
  </Base>
);

export const Primary = () => (
  <Base>
    <Component importance="primary" label="Hello World" />
  </Base>
);

export const Icon = () => (
  <Base>
    <Component icon={<Close />} />
  </Base>
);
