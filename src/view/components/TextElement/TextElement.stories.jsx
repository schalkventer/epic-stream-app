import styled from "@emotion/styled";
import { Component } from "./TextElement";
import { Component as Base } from "../Base";

export default {
  title: "components/TextElement",
  component: Component,
  tags: ["autodocs"],
};

const Inherit = styled.div`
  color: red;
`;

export const Basic = () => (
  <Base>
    <Component size="s">Hello World</Component>
    <Component size="m">Hello World</Component>
    <Component size="l">Hello World</Component>

    <Component importance="primary" size="s">
      Hello World
    </Component>

    <Component importance="primary" size="m">
      Hello World
    </Component>

    <Component importance="primary" size="l">
      Hello World
    </Component>

    <Inherit>
      <Component importance="inherit" size="s">
        Hello World
      </Component>

      <Component importance="inherit" size="m">
        Hello World
      </Component>

      <Component importance="inherit" size="l">
        Hello World
      </Component>
    </Inherit>
  </Base>
);
