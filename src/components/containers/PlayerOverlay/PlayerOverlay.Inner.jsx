import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import schema from "./PlayerOverlay.schema";
import { COLORS } from "../../../constants";

import { Component as MiniPlayer } from "../../presentation/MiniPlayer";
import { Component as OverlayContent } from "../../presentation/OverlayContent";

import shows from "../../../data/shows";
import episodes from "../../../data/episodes";
import favourites from "../../../data/favourites";
import progress from "../../../data/progress";

const MiniWrapper = styled.div`
  border-top: 1px solid ${COLORS.background.light};
  position: fixed;
  bottom: 4rem;
  left: 0;
  width: 100%;
`;

export const Inner = (props) => {
  const { id, isOpen, toggleOpen } = props;

  const [node, setNode] = useState(null);
  const { show: showId } = episodes.helpers.convert.toProperties(id);

  const { result: show } = shows.hooks.useSingle(showId);
  const { result: fav } = favourites.hooks.useSingle(id);
  const { result: percentage } = progress.hooks.useSingle(id);
  const { result: episode, change: changeEpisode } =
    episodes.hooks.useSingle(id);

  const toggleFav = favourites.hooks.useToggle();

  useEffect(() => {
    changeEpisode(id);
  }, [id, changeEpisode]);

  useEffect(() => {
    if (!node) return;
    const { duration } = episode;
    const seconds = (percentage / 100) * duration;
    node.currentTime = seconds;

    // This should only be set when the actual episode changes or the player
    // opens, if progress is a dependency it might cause a circular update.

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node]);

  if (!show || !episode) return null;
  const { file } = episode;
  const { duration, title: episodeTitle, image } = episode;
  const progressAsNumber = percentage || 0;

  return (
    <>
      <MiniWrapper>
        <MiniPlayer
          image={image}
          onStart={toggleOpen}
          progress={progressAsNumber}
          title={episodeTitle}
          subtitle={show.title}
          total={duration}
        />
      </MiniWrapper>

      {isOpen && (
        <OverlayContent
          title="Player"
          secondary={{
            action: () => toggleFav(id),
            label: `${fav ? "Add to" : "Remove from"} Favourites`,
          }}
          primary={{ action: toggleOpen, label: "Close" }}
        >
          <video ref={setNode} src={file} controls controlsList="nodownload" />
        </OverlayContent>
      )}
    </>
  );
};

Inner.propTypes = schema.inner;
