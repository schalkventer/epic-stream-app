import { Component as Testing } from "../../environments/Testing";
import { Component } from "./EpisodePreview";

export default {
  title: "components/EpisodePreview",
  component: Component,
  tags: ["autodocs"],
};

export const Basic = () => (
  <Testing>
    <Component
      image="https://picsum.photos/200/300"
      title="Hello World"
      subtitle="Ipsum Lorem"
      percentage={14}
    />
  </Testing>
);

export const NoSubtitle = () => (
  <Testing>
    <Component
      image="https://picsum.photos/200/300"
      title="Hello World"
      percentage={34}
    />
  </Testing>
);

export const Link = () => (
  <Testing>
    <Component
      image="https://picsum.photos/200/300"
      title="Hello World"
      subtitle="Ipsum Lorem"
      percentage={64}
      // eslint-disable-next-line no-alert
      onClick={() => alert("EpisodePreview")}
    />
  </Testing>
);

export const List = () => (
  <Testing>
    <Component
      image="https://picsum.photos/200/300"
      title="One Hello World"
      subtitle="Five Ipsum Lorem"
      percentage={14}
    />

    <Component
      image="https://picsum.photos/200/300"
      title="Two Hello World"
      subtitle="Six Ipsum Lorem"
      percentage={94}
    />

    <Component
      image="https://picsum.photos/200/300"
      title="Three Hello World"
      subtitle="Seven Ipsum Lorem"
      percentage={32}
    />

    <Component
      image="https://picsum.photos/200/300"
      title="Four Hello World"
      subtitle="Eight Ipsum Lorem"
      percentage={34}
    />
  </Testing>
);
