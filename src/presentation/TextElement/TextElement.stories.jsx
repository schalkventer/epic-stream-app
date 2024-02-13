import styled from "@emotion/styled";
import { Component } from "./TextElement";
import { Component as Testing } from "../../environments/Testing";

export default {
  title: "components/TextElement",
  component: Component,
  tags: ["autodocs"],
};

const Inherit = styled.div`
  color: red;
`;

export const Loading = () => (
  <Testing>
    <Component size="s">{4}</Component>
    <Component size="m">{6}</Component>
    <Component size="l">{10}</Component>
  </Testing>
);

export const Basic = () => (
  <Testing>
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
  </Testing>
);

export const Custom = () => (
  <Testing>
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
  </Testing>
);
