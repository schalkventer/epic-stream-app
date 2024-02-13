import { useEffect } from "react";
import styled from "@emotion/styled";
import schema from "./PlayerOverlay.schema";
import { COLORS } from "../../constants";
import { Controls } from "./PlayerOverlay.Controls";
import { Component as MiniPlayer } from "../../presentation/MiniPlayer";

import shows from "../../data/shows";
import episodes from "../../data/episodes";
import progress from "../../data/progress";

const MiniWrapper = styled.div`
  border-top: 1px solid ${COLORS.background.light};
  position: fixed;
  bottom: 4rem;
  left: 0;
  width: 100%;

  @media (min-width: 40rem) {
    bottom: 0;
  }
`;

export const Wrapper = (props) => {
  const { id, isOpen, toggleOpen } = props;
  const { show: showId } = episodes.helpers.convert.toProperties(id);
  const { result: show } = shows.hooks.useSingle(showId);
  const { result: percentage } = progress.hooks.useSingle(id);

  const { result: episode, change: changeEpisode } =
    episodes.hooks.useSingle(id);

  useEffect(() => {
    changeEpisode(id);
  }, [id, changeEpisode]);

  if (!show || !episode) return null;

  const { duration, title: episodeTitle, image } = episode;

  return (
    <>
      <MiniWrapper>
        <MiniPlayer
          image={image}
          onStart={toggleOpen}
          progress={percentage || 0}
          title={episodeTitle}
          subtitle={show.title}
          total={duration}
        />
      </MiniWrapper>

      {isOpen && (
        <Controls
          id={id}
          show={show.title}
          toggleOpen={toggleOpen}
          duration={duration}
          file={episode.file}
        />
      )}
    </>
  );
};

Wrapper.propTypes = schema.wrapper;
