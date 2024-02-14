import { Component, Placeholder } from "./ShowDetails";
import { Component as Testing } from "../../services/Testing";

export default {
  title: "components/ShowDetails",
  component: Component,
  tags: ["autodocs"],
};

export const Basic = () => (
  <Testing>
    <Component
      image="https://picsum.photos/200/300"
      title="Hello World"
      updated={new Date()}
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tristique, lectus a dictum bibendum, ex urna facilisis tellus, ac volutpat nisi tellus sed risus. Proin rhoncus finibus mi, maximus porta quam tempor nec. Donec vel iaculis odio, sit amet cursus augue. Morbi efficitur nibh metus, vitae hendrerit orci malesuada pulvinar."
      seasons={3}
      genres={["Hello", "World", "Lorem", "Ipsum"]}
    />
  </Testing>
);

export const Loading = () => (
  <Testing>
    <Placeholder />
  </Testing>
);
