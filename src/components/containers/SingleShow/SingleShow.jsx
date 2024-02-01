import { useNavigate } from "react-router-dom";
import data from "../../../data";
import schema from "./SingleShow.schema";
import { Component as PageSection } from "../../presentation/PageSection";
import ShowDetails from "../../presentation/ShowDetails";
import { Component as UserEntry } from "../../presentation/UserEntry";
import { Component as EpisodePreview } from "../../presentation/EpisodePreview";

const Loading = () => (
  <PageSection title="Show" actions={[]}>
    <ShowDetails.Placeholder />
  </PageSection>
);

/**
 *
 */
export const Component = (props) => {
  const { id } = props;

  const navigate = useNavigate();
  const show = data.hooks.useSingleShow(id);

  const { list, query, changeQuery } = data.hooks.useEpisodes({
    show: id,
    season: 1,
  });

  if (!show || !list) return <Loading />;

  const { description, genres, image, seasons, title, updated } = show;
  const { season } = query;

  const handleSeasonChange = (inner) => {
    const trimmed = inner.replace(/season\s/i, "");
    changeQuery({ season: Number(trimmed) });
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
      <ShowDetails.Component
        seasons={seasons}
        description={description}
        genres={genres}
        image={image}
        title={title}
        updated={updated}
      >
        <UserEntry
          label="Season"
          value={`Season ${season}`}
          options={new Array(seasons).fill(0).map((_, i) => `Season ${i + 1}`)}
          onChange={handleSeasonChange}
        />
      </ShowDetails.Component>

      {list.map(
        ({
          episode,
          id: innerId,
          image: innerImage,
          progress,
          title: innerTitle,
        }) => {
          const subtitle = `S${season.toString().padStart(2, "0")} E${episode.toString().padStart(2, "0")}`;

          return (
            <EpisodePreview
              key={innerId}
              image={innerImage}
              title={innerTitle}
              subtitle={subtitle}
              percentage={progress}
              onClick={() => console.log(innerId)}
            />
          );
        },
      )}
    </PageSection>
  );
};

Component.propTypes = schema.props;
