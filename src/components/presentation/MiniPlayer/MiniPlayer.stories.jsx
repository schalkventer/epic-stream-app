import { useState } from "react";
import { Component } from "./MiniPlayer";
import { Component as Testing } from "../../environments/Testing";

export default {
  title: "components/MiniPlayer",
  component: Component,
};

export const Basic = () => {
  const [open, setOpen] = useState(false);

  return (
    <Testing>
      <button onClick={() => setOpen(true)} type="button">
        CLICK ME
      </button>

      {open && <Component />}
    </Testing>
  );
};
