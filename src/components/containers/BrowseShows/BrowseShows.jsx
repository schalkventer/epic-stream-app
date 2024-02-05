import { useEffect } from "react";
import styled from "@emotion/styled";
import schema from "./BrowseShows.schema";
import shows from "../../../data/shows";
import { PageFilters, useOpen } from "../../presentation/AppShell";
import { Component as PageSection } from "../../presentation/PageSection";
import ShowPreview from "../../presentation/ShowPreview";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;

  @media (min-width: 30rem) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 40rem) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 55rem) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 75rem) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (min-width: 90rem) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (min-width: 100rem) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

/**
 *
 */
const Loading = () => (
  <>
    {new Array(16)
      .fill(0)
      .map((val, index) => val + index)
      .map((key) => (
        <ShowPreview.Placeholder key={key} />
      ))}
  </>
);

/**
 *
 */
export const Component = (props) => {
  const { query: startingQuery } = props;
  const [open, setOpen] = useOpen();

  const { result, query, change } = shows.hooks.useList({
    ...shows.helpers.BLANK_QUERY,
    ...startingQuery,
  });

  useEffect(() => {
    if (!open && Object.keys(startingQuery).length > 0) setOpen(true);
    if (open && Object.keys(startingQuery).length < 1) setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startingQuery]);

  if (!query) throw new Error("Query is required");
  const { genre, search, sorting } = query;

  return (
    <>
      <PageFilters
        filters={[
          {
            label: "Search",
            value: search,
            size: "l",

            onChange: (inner) =>
              change({ ...shows.helpers.BLANK_QUERY, search: inner }),
          },
          {
            label: "Genre",
            value: genre,
            options: ["All", ...shows.schema.genre.options],
            size: "s",

            onChange: (inner) =>
              change({ ...shows.helpers.BLANK_QUERY, genre: inner }),
          },
          {
            label: "Sort",
            value: sorting,
            options: shows.schema.sorting.options,
            size: "s",

            onChange: (inner) =>
              change({ ...shows.helpers.BLANK_QUERY, sorting: inner }),
          },
        ]}
      />

      <PageSection title="Browse" actions={[]}>
        <Grid>
          {!result && <Loading />}

          {result &&
            result.map(({ id, image, title, genres, updated }) => (
              <ShowPreview.Component
                key={id}
                genres={genres}
                image={image}
                title={title}
                updated={updated}
                action={`/show/${id}`}
              />
            ))}
        </Grid>
      </PageSection>
    </>
  );
};

Component.propTypes = schema.props;
