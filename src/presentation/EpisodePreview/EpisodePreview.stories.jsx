import { Component as Testing } from "../../services/Testing";
import { Component, Placeholder } from "./EpisodePreview";

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
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vestibulum, turpis non euismod imperdiet, dui lorem porta purus, ac pretium sapien nunc sed sem. Etiam nec justo vitae turpis eleifend dapibus ultrices nec metus. Vestibulum varius arcu id nibh accumsan auctor. Maecenas consequat accumsan egestas. Pellentesque efficitur hendrerit risus, at vehicula est. Donec lacinia lacinia velit, vel efficitur nisl rutrum eu. Mauris sollicitudin, ex sit amet bibendum vestibulum, neque metus vehicula erat, quis sodales ante libero tincidunt magna."
    />

    <Component
      image="https://picsum.photos/200/300"
      title="Two Hello World"
      subtitle="Six Ipsum Lorem"
      percentage={94}
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vestibulum, turpis non euismod imperdiet, dui lorem porta purus, ac pretium sapien nunc sed sem. Etiam nec justo vitae turpis eleifend dapibus ultrices nec metus. Vestibulum varius arcu id nibh accumsan auctor. Maecenas consequat accumsan egestas. Pellentesque efficitur hendrerit risus, at vehicula est. Donec lacinia lacinia velit, vel efficitur nisl rutrum eu. Mauris sollicitudin, ex sit amet bibendum vestibulum, neque metus vehicula erat, quis sodales ante libero tincidunt magna."
    />

    <Component
      image="https://picsum.photos/200/300"
      title="Three Hello World"
      subtitle="Seven Ipsum Lorem"
      percentage={32}
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vestibulum, turpis non euismod imperdiet, dui lorem porta purus, ac pretium sapien nunc sed sem. Etiam nec justo vitae turpis eleifend dapibus ultrices nec metus. Vestibulum varius arcu id nibh accumsan auctor. Maecenas consequat accumsan egestas. Pellentesque efficitur hendrerit risus, at vehicula est. Donec lacinia lacinia velit, vel efficitur nisl rutrum eu. Mauris sollicitudin, ex sit amet bibendum vestibulum, neque metus vehicula erat, quis sodales ante libero tincidunt magna."
    />

    <Component
      image="https://picsum.photos/200/300"
      title="Four Hello World"
      subtitle="Eight Ipsum Lorem"
      percentage={34}
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vestibulum, turpis non euismod imperdiet, dui lorem porta purus, ac pretium sapien nunc sed sem. Etiam nec justo vitae turpis eleifend dapibus ultrices nec metus. Vestibulum varius arcu id nibh accumsan auctor. Maecenas consequat accumsan egestas. Pellentesque efficitur hendrerit risus, at vehicula est. Donec lacinia lacinia velit, vel efficitur nisl rutrum eu. Mauris sollicitudin, ex sit amet bibendum vestibulum, neque metus vehicula erat, quis sodales ante libero tincidunt magna."
    />
  </Testing>
);

export const Loading = () => (
  <Testing>
    <Placeholder />
    <Placeholder />
    <Placeholder />
    <Placeholder />
  </Testing>
);
