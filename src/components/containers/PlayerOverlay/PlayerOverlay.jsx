import styled from "@emotion/styled";
import data from "../../../data";
import schema from "./PlayerOverlay.schema";
import { Component as MiniPlayer } from "../../presentation/MiniPlayer";
import { Component as OverlayContent } from "../../presentation/OverlayContent";

const MiniWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
`;

export const Component = (props) => {
  const { id, show: showId, status, onStop, onStart } = props;
  const show = data.hooks.useSingleShow(showId);

  const { result: episode } = data.hooks.useSingleEpisode({
    id,
    show,
  });

  if (!show || !episode) return null;

  return (
    <div>
      {status === "stopped" && (
        <MiniWrapper>
          <MiniPlayer
            image={episode.image}
            onStart={onStart}
            progress={episode.progress}
            title={episode.title}
            subtitle="asdasd"
            total={5000}
          />
        </MiniWrapper>
      )}

      {status === "playing" && (
        <OverlayContent
          title="Player"
          secondary={{ action: () => console.log(1), label: "Add Favourite" }}
          primary={{ action: onStop, label: "Close" }}
        >
          {/* <video
            src="https://epic-stream-api.netlify.app/placeholder.mp4"
            controls
            controlsList="nodownload"
          /> */}
        </OverlayContent>
      )}
    </div>
  );
};

Component.propTypes = schema.props;
