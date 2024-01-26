import { Component as Testing } from "../../environments/Testing";
import { Component as AppShell } from "../../components/AppShell";
import { Container } from "./BrowseShows";

export default {
  title: "containers/BrowseShows",
  component: Container,
  parameters: {
    layout: "fullscreen",
  },
};

export const Basic = () => (
  <Testing>
    <AppShell>
      <Container />
    </AppShell>
  </Testing>
);
