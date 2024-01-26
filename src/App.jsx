import { Component as Production } from "./view/environments/Production";
import { Component as AppShell } from "./view/components/AppShell";
import { Container as BrowseShows } from "./view/containers/BrowseShows";

export const App = () => (
  <Production>
    <AppShell>
      <BrowseShows />
    </AppShell>
  </Production>
);

export default {
  App,
};
