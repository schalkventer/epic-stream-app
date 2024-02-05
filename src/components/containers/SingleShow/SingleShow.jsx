import { useNavigate } from "react-router-dom";
import { useLayoutEffect } from "react";
import styled from "@emotion/styled";
import shows from "../../../data/shows";
import episodes from "../../../data/episodes";
import schema from "./SingleShow.schema";
import { Component as PageSection } from "../../presentation/PageSection";
import ShowDetails from "../../presentation/ShowDetails";
import { Component as UserEntry } from "../../presentation/UserEntry";
import EpisodePreview from "../../presentation/EpisodePreview";

const Wrapper = styled.div`
  padding-top: 1rem;
`;

/**
 *
 */
export const Component = (props) => {
  const { id } = props;

  const navigate = useNavigate();
  const { result: show } = shows.hooks.useSingle(id);

  const {
    result: list,
    query: { season },
    change,
  } = episodes.hooks.useList({
    show: id,
    season: 1,
  });

  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, []);

  const handleSeasonChange = (inner) => {
    const trimmed = inner.replace(/season\s/i, "");
    change({ show: id, season: Number(trimmed) });
  };

  return (
    <PageSection
      title="Show"
      actions={[
        {
          label: "Back",
          action: () => navigate(-1, { preventScrollReset: true }),
        },
      ]}
    >
      {!show && <ShowDetails.Placeholder />}

      {show && (
        <ShowDetails.Component
          seasons={show.seasons}
          description={show.description}
          genres={show.genres}
          image={show.image}
          title={show.title}
          updated={show.updated}
        >
          <UserEntry
            label="Season"
            value={`Season ${season}`}
            onChange={handleSeasonChange}
            options={new Array(show.seasons)
              .fill(0)
              .map((_, i) => `Season ${i + 1}`)}
          />
        </ShowDetails.Component>
      )}

      <Wrapper>
        {(!list || list.length < 1) &&
          new Array(20)
            .fill(0)
            .map((_, index) => (
              <EpisodePreview.Placeholder key={index.toString()} />
            ))}

        {list &&
          list.map(
            ({ episode, id: innerId, image, progress, title, description }) => {
              const subtitle = `S${season.toString().padStart(2, "0")} E${episode.toString().padStart(2, "0")}`;

              return (
                <EpisodePreview.Component
                  key={innerId}
                  image={image}
                  title={title}
                  subtitle={subtitle}
                  percentage={progress}
                  description={description}
                  onClick={() => console.log(innerId)}
                />
              );
            },
          )}
      </Wrapper>
    </PageSection>
  );
};

Component.propTypes = schema.props;
