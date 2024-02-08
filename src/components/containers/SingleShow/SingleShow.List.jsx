import { useEffect } from "react";
import styled from "@emotion/styled";
import episodes from "../../../data/episodes";
import schema from "./SingleShow.schema";
import EpisodePreview from "../../presentation/EpisodePreview";

const Wrapper = styled.div`
  padding-top: 1rem;
`;

const Item = styled.div`
  margin: 0.5rem 0;
`;

export const List = (props) => {
  const { show, season } = props;
  const { toggle } = episodes.hooks.usePlayer();

  const { result, change } = episodes.hooks.useSeason({
    show,
    season: 1,
  });

  useEffect(() => {
    change({ show, season });
  }, [change, show, season]);

  if (!result || result.length < 1) {
    return (
      <Wrapper>
        {new Array(20).fill(0).map((_, index) => (
          <Item key={index.toString()}>
            <EpisodePreview.Placeholder />
          </Item>
        ))}
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {result.map(
        ({ episode, id: innerId, image, progress, title, description }) => {
          const subtitle = `S${season.toString().padStart(2, "0")} E${episode.toString().padStart(2, "0")}`;

          return (
            <Item key={innerId}>
              <EpisodePreview.Component
                image={image}
                title={title}
                subtitle={subtitle}
                percentage={progress || 0}
                description={description}
                onClick={() => toggle(innerId)}
              />
            </Item>
          );
        },
      )}
    </Wrapper>
  );
};

List.propTypes = schema.list;
