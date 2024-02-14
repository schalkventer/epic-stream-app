import { useState } from "react";
import { Component } from "./UserEntry";
import { Component as Testing } from "../../services/Testing";

export default {
  title: "components/UserEntry",
  component: Component,
  tags: ["autodocs"],
};

export const Basic = () => {
  const [value, setValue] = useState("123");

  return (
    <Testing>
      <Component label="Hello World" value={value} onChange={setValue} />
    </Testing>
  );
};

export const Dropdown = () => {
  const [value, setValue] = useState("One");

  return (
    <Testing>
      <Component
        label="Hello World"
        value={value}
        options={["One", "Two", "Three"]}
        onChange={setValue}
      />
    </Testing>
  );
};
