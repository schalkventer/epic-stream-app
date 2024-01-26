import { Component as AppShell } from "../../components/AppShell";
import { Component as Base } from "../../components/Base";
import { Component } from "./FavouritesList";

export default {
  title: "containers/FavouritesList",
  component: Component,
  parameters: {
    layout: "fullscreen",
  },
};

export const Basic = () => (
  <Base>
    <AppShell>
      <Component />
    </AppShell>
  </Base>
);
