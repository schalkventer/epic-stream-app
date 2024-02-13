import { Component } from "./PageSection";
import { Component as Testing } from "../../environments/Testing";

export default {
  title: "components/PageSection",
  component: Component,
  tags: ["autodocs"],
};

export const Basic = () => (
  <Testing>
    <Component
      title="Hello World"
      actions={[
        {
          label: "Hello",
          onClick: () => {},
        },
        {
          label: "World",
          onClick: () => {},
        },
      ]}
    >
      <div>Hello World</div>
    </Component>
  </Testing>
);
