import { useState } from "react";
import { Component } from "./UserEntry";
import { Component as Base } from "../Base";

export default {
  title: "components/UserEntry",
  component: Component,
  tags: ["autodocs"],
};

export const Basic = () => {
  const [value, setValue] = useState("123");

  return (
    <Base>
      <Component label="Hello World" value={value} onChange={setValue} />
    </Base>
  );
};

export const Dropdown = () => {
  const [value, setValue] = useState("One");

  return (
    <Base>
      <Component
        label="Hello World"
        value={value}
        options={["One", "Two", "Three"]}
        onChange={setValue}
      />
    </Base>
  );
};
