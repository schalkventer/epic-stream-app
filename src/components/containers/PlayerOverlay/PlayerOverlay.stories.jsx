import { useState } from "react";
import { Component as Testing } from "../../environments/Testing";
import { Component } from "./PlayerOverlay";

export default {
  title: "containers/PlayerOverlay",
  component: Component,
  parameters: {
    layout: "fullscreen",
  },
};

export const Basic = () => {
  const [status, setStatus] = useState("stopped");

  return (
    <Testing>
      <Component
        id="bfe26e23-13d0-4ed6-8701-3b1a160a6623"
        status={status}
        onStart={() => setStatus("playing")}
        onStop={() => setStatus("stopped")}
      />
    </Testing>
  );
};
