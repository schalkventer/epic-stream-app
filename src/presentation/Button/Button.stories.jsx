import { Close } from "@mui/icons-material";
import { Component } from "./Button";
import { Component as Testing } from "../../environments/Testing";

export default {
  title: "components/Button",
  component: Component,
  tags: ["autodocs"],
};

export const Basic = () => (
  <Testing>
    <Component label="Hello World" />
  </Testing>
);

export const Primary = () => (
  <Testing>
    <Component importance="primary" label="Hello World" />
  </Testing>
);

export const Icon = () => (
  <Testing>
    <Component icon={<Close />} />
  </Testing>
);
