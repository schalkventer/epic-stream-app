import { useState } from "react";
import { Component } from "./OverlayContent";
import { Component as Testing } from "../../environments/Testing";

export default {
  title: "components/OverlayContent",
  component: Component,
};

export const Basic = () => {
  const [open, setOpen] = useState(false);

  return (
    <Testing>
      <button onClick={() => setOpen(true)} type="button">
        CLICK ME
      </button>

      {open && (
        <Component
          title="Hello World"
          onClose={() => setOpen(false)}
          secondary={{ label: "Close", action: () => setOpen(false) }}
          // eslint-disable-next-line no-alert
          primary={{ label: "Click me!", action: () => alert("Clicked") }}
        >
          Hello World
        </Component>
      )}
    </Testing>
  );
};
