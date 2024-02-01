import url from "query-string";
import { Routes, Route, useParams, useLocation } from "react-router-dom";
import { Component as Production } from "./components/environments/Production";
import { Component as BrowseShows } from "./components/containers/BrowseShows";
import { Component as SingleShow } from "./components/containers/SingleShow";
import { Component as FeaturedShows } from "./components/containers/FeaturedShows";

import { Component as AppShell } from "./components/presentation/AppShell";

/**
 *
 */
const SingleShowWrap = () => {
  const { id } = useParams();
  return <SingleShow id={id} />;
};

/**
 *
 */
const BrowseShowsWrap = () => {
  const { search } = useLocation();
  const response = url.parse(search);

  const entries = Object.entries(response).filter(([key]) =>
    ["search", "genre", "sorting"].includes(key),
  );

  return <BrowseShows query={Object.fromEntries(entries)} />;
};

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
        <Route path="/browse" element={<BrowseShowsWrap />} />
        <Route path="/show/:id" element={<SingleShowWrap />} />
      </Routes>
    </AppShell>
  </Production>
);
