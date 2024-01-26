import { Component as Base } from "../Base";
import { Component, Placeholder } from "./ShowPreview";

export default {
  title: "components/ShowPreview",
  component: Component,
  tags: ["autodocs"],
};

export const Basic = () => (
  <Base>
    <Component
      image="https://picsum.photos/200/300"
      title="Hello World"
      genres={["Hello", "World", "Ipsum"]}
    />
  </Base>
);

export const Loading = () => (
  <Base>
    <Placeholder />
  </Base>
);

export const LongTitle = () => (
  <Base>
    <Component
      image="https://picsum.photos/200/300"
      title="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tristique, lectus a dictum bibendum, ex urna facilisis tellus, ac volutpat nisi tellus sed risus. Proin rhoncus finibus mi, maximus porta quam tempor nec. Donec vel iaculis odio, sit amet cursus augue. Morbi efficitur nibh metus, vitae hendrerit orci malesuada pulvinar."
      genres={["Hello"]}
    />
  </Base>
);
