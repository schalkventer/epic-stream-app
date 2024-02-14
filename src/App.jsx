import url from "query-string";
import { Routes, Route, useParams, useLocation } from "react-router-dom";
import { Component as Production } from "./services/Production";
import { Component as BrowseShows } from "./containers/BrowseShows";
import { Component as SingleShow } from "./containers/SingleShow";
import { Component as FavouritesList } from "./containers/FavouritesList";
import { Component as FeaturedShows } from "./containers/FeaturedShows";
import { Component as PlayerOverlay } from "./containers/PlayerOverlay";
import { Component as AppShell } from "./presentation/AppShell";

/**
 * A wrapper around the `SingleShow` that intercepts and passes specific
 * route-level information to the container. Separating the routing logic from
 * the container itself makes it easier to test the container without emulating
 * the browser URL behaviour.
 */
const SingleShowWrap = () => {
  const { id } = useParams();
  return <SingleShow id={id} />;
};

/**
 * A wrapper around the `BrowseShows` that intercepts and passes specific
 * route-level information to the container. Separating the routing logic from
 * the container itself makes it easier to test the container without emulating
 * the browser URL behaviour.
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
 * Top-most component responsible for managing everything that sits above the
 * `container` level. The primary purpose of this component is to add the
 * `Production` environment and to decided which containers to render based on
 * routing information.
 */
export const App = () => (
  <Production>
    <PlayerOverlay>
      <AppShell>
        <Routes>
          <Route path="/browse" element={<BrowseShowsWrap />} />
          <Route path="/show/:id" element={<SingleShowWrap />} />
          <Route path="/account" element={<FavouritesList />} />
          <Route path="/" element={<FeaturedShows />} />
        </Routes>
      </AppShell>
    </PlayerOverlay>
  </Production>
);
