import { Routes, Route } from "react-router-dom";
import { Component as Production } from "./components/environments/Production";
import { Component as AppShell } from "./components/presentation/AppShell";
import { Component as BrowseShows } from "./components/containers/BrowseShows";
// import { Component as SingleShow } from "./components/containers/SingleShow";
import { Component as FeaturedShows } from "./components/containers/FeaturedShows";

/**
 * Top-most component responsible for managing all logic that sits above the
 * `container` level. The primary purpose of this component is to add the
 * `Production` environment and to feed routing logic to the app itself -
 * specifically in terms of which containers should be rendered.
 */
export const App = () => (
  <Production>
    <AppShell>
      <Routes>
        <Route path="/" element={<FeaturedShows />} />
        <Route path="/browse" element={<BrowseShows />} />
      </Routes>
    </AppShell>
  </Production>
);
