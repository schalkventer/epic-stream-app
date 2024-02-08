import { useNavigate } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import shows from "../../../data/shows";
import schema from "./SingleShow.schema";
import { Component as PageSection } from "../../presentation/PageSection";
import ShowDetails from "../../presentation/ShowDetails";
import { Component as UserEntry } from "../../presentation/UserEntry";
import { List } from "./SingleShow.List";

/**
 *
 */
export const Component = (props) => {
  const { id } = props;
  const [season, setSeason] = useState(1);

  const navigate = useNavigate();
  const { result: show } = shows.hooks.useSingle(id);

  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, []);

  const handleSeasonChange = (inner) => {
    const trimmed = inner.replace(/season\s/i, "");
    setSeason(Number(trimmed));
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
        <>
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

          <List show={id} season={season} />
        </>
      )}
    </PageSection>
  );
};

Component.propTypes = schema.props;
