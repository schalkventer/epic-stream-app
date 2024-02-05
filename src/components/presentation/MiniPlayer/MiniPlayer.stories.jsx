import { Component } from "./MiniPlayer";
import { Component as Testing } from "../../environments/Testing";

export default {
  title: "components/MiniPlayer",
  component: Component,
};

export const Basic = () => (
  <Testing>
    <Component
      image="https://picsum.photos/200/300"
      title="Four Hello World"
      subtitle="Eight Ipsum Lorem"
      progress={34}
      total={1.8 * 60 * 60}
      // eslint-disable-next-line no-alert
      onStart={() => alert("onStart")}
    />
  </Testing>
);
