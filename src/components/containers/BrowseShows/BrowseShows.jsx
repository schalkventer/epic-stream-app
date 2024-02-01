import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import schema from "./BrowseShows.schema";
import { PageFilters } from "../../presentation/AppShell";
import data from "../../../data";
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
  const { query: initial } = props;
  const navigate = useNavigate();
  const { list, query, changeQuery } = data.hooks.useShowsList(initial);
  const { genre, search, sorting } = query;

  return (
    <>
      <PageFilters
        filters={[
          {
            label: "Search",
            value: search,
            onChange: (inner) => changeQuery({ search: inner }),
            size: "l",
          },
          {
            label: "Genre",
            value: genre,
            onChange: (inner) => changeQuery({ genre: inner }),
            options: ["All", ...data.schema.shows.genre.options],
            size: "s",
          },
          {
            label: "Sort",
            value: sorting,
            onChange: (inner) => changeQuery({ sorting: inner }),
            options: data.schema.shows.sorting.options,
            size: "s",
          },
        ]}
      />

      <PageSection title="Browse" actions={[]}>
        <Grid>
          {!list && <Loading />}

          {list &&
            list.map(({ id, image, title, genres, updated }) => (
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
