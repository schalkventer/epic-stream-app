import { useEffect } from "react";
import styled from "@emotion/styled";
import episodes from "../../data/episodes";
import progress from "../../data/progress";
import schema from "./SingleShow.schema";
import EpisodePreview from "../../presentation/EpisodePreview";
import favourites from "../../data/favourites";

const Wrapper = styled.div`
  padding-top: 1rem;
`;

const Inner = styled.div`
  margin: 0.5rem 0;
`;

const Item = (props) => {
  const { id, image, title, subtitle, description, onClick } = props;
  const { result: percentage } = progress.hooks.useSingle(id);
  const { result: fav } = favourites.hooks.useSingle(id);

  return (
    <Inner>
      <EpisodePreview.Component
        image={image}
        title={title}
        subtitle={subtitle}
        percentage={percentage || 0}
        description={description}
        onClick={onClick}
        favourited={Boolean(fav)}
      />
    </Inner>
  );
};

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
      {result.map(({ episode, id: innerId, image, title, description }) => {
        const subtitle = `S${season.toString().padStart(2, "0")} E${episode.toString().padStart(2, "0")}`;

        return (
          <Item
            key={innerId}
            id={innerId}
            image={image}
            title={title}
            subtitle={subtitle}
            description={description}
            onClick={() => toggle(innerId)}
          />
        );
      })}
    </Wrapper>
  );
};

Item.propTypes = schema.item;
List.propTypes = schema.list;
