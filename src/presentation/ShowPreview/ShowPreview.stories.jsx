import { Component as Testing } from "../../services/Testing";
import { Component, Placeholder } from "./ShowPreview";

export default {
  title: "components/ShowPreview",
  component: Component,
  tags: ["autodocs"],
};

export const Basic = () => (
  <Testing>
    <Component
      image="https://picsum.photos/200/300"
      title="Hello World"
      genres={["Hello", "World", "Ipsum"]}
      seasons={3}
      updated={new Date("2010-05-05T10:30:20")}
    />
  </Testing>
);

export const Loading = () => (
  <Testing>
    <Placeholder />
  </Testing>
);

export const LongTitle = () => (
  <Testing>
    <Component
      image="https://picsum.photos/200/300"
      title="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tristique, lectus a dictum bibendum, ex urna facilisis tellus, ac volutpat nisi tellus sed risus. Proin rhoncus finibus mi, maximus porta quam tempor nec. Donec vel iaculis odio, sit amet cursus augue. Morbi efficitur nibh metus, vitae hendrerit orci malesuada pulvinar."
      genres={["Hello"]}
      seasons={3}
      updated={new Date("2010-05-05T10:30:20")}
    />
  </Testing>
);
