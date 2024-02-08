import { Component as Testing } from "../../environments/Testing";
import { Inner } from "./PlayerOverlay.Inner";

export default {
  title: "containers/PlayerOverlay",
  component: Inner,
  parameters: {
    layout: "fullscreen",
  },
};

/**
 *
 */
export const Basic = () => (
  <Testing>
    <Inner id="bfe26e23-13d0-4ed6-8701-3b1a160a6623_55ef4ea2-a739-4e6e-999e-3a69962b2e37" />
  </Testing>
);
