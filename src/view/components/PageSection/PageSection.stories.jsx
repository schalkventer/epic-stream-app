import { Component } from "./PageSection";
import { Component as Base } from "../Base";

export default {
  title: "components/PageSection",
  component: Component,
  tags: ["autodocs"],
};

export const Basic = () => (
  <Base>
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
  </Base>
);
