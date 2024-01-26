import { Component as AppShell } from "../../components/AppShell";
import { Component as Base } from "../../components/Base";
import { Container } from "./FeaturedShows";

export default {
  title: "containers/FeaturedShows",
  component: Container,
  parameters: {
    layout: "fullscreen",
  },
};

export const Basic = () => (
  <Base>
    <AppShell>
      <Container />
    </AppShell>
  </Base>
);
