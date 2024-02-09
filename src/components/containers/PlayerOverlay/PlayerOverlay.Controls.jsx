import { useEffect, useRef } from "react";
import { Star, StarOutline } from "@mui/icons-material";

import { Component as OverlayContent } from "../../presentation/OverlayContent";
import schema from "./PlayerOverlay.schema";
import favourites from "../../../data/favourites";
import progress from "../../../data/progress";

export const Controls = (props) => {
  const { id, show, toggleOpen, duration, file } = props;
  const { result: fav } = favourites.hooks.useSingle(id);
  const { result: percentage } = progress.hooks.useSingle(id);

  const autoUpdate = progress.hooks.useAutoUpdater(1);
  const toggleFav = favourites.hooks.useToggle();
  const ref = useRef(null);

  const handleRef = (node) => {
    if (ref.current || !node) return;
    ref.current = node;

    // Only way to update in DOM is to reassign.
    // eslint-disable-next-line no-param-reassign
    node.currentTime = progress.helpers.convert.toSeconds(percentage, duration);
    node.play();
  };

  useEffect(() => {
    autoUpdate.start({
      id,
      callback: () => {
        if (!ref.current) return 0;
        const { currentTime } = ref.current;
        return progress.helpers.convert.toPercentage(currentTime, duration);
      },
    });

    return () => autoUpdate.stop();
  }, [id, autoUpdate, duration]);

  return (
    <OverlayContent
      title={show}
      secondary={{
        action: () => toggleFav(id),
        label: "",
        icon: fav ? <StarOutline /> : <Star />,
        tooltip: `${fav ? "Add to" : "Remove from"} favourites`,
      }}
      primary={{ action: toggleOpen, label: "Close" }}
    >
      <video ref={handleRef} src={file} controls controlsList="nodownload" />
    </OverlayContent>
  );
};

Controls.propTypes = schema.controls;
