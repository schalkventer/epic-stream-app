import { useState } from "react";
import styled from "@emotion/styled";
import { PageFilters } from "../../components/AppShell";
import * as data from "../../../model/data";
import { Component as PageSection } from "../../components/PageSection";
import * as ShowPreview from "../../components/ShowPreview";
import { GENRE_LABELS } from "../../../constants";

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

  @media (min-width: 110rem) {
    grid-template-columns: repeat(7, 1fr);
  }

  @media (min-width: 130rem) {
    grid-template-columns: repeat(8, 1fr);
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
export const Container = () => {
  const list = data.read.useShowsList();
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");

  const display = list.filter(({ title, genres }) => {
    const genreAsIndex = Object.values(GENRE_LABELS).indexOf(genre);
    if (genre !== "All" && !genres.includes(genreAsIndex)) {
      return false;
    }

    if (
      search.length > 2 &&
      !title.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  return (
    <>
      <PageFilters
        filters={[
          {
            label: "Search",
            value: search,
            onChange: setSearch,
            size: "l",
          },
          {
            label: "Genre",
            value: genre,
            onChange: setGenre,
            options: ["All", ...Object.values(GENRE_LABELS)],
            size: "s",
          },
        ]}
      />

      <PageSection title="Browse" actions={[]}>
        <Grid>
          {list.length === 0 && <Loading />}

          {display.length > 0 &&
            display.map(({ id, image, title, genres }) => (
              <ShowPreview.Component
                key={id}
                genres={genres.map((inner) => GENRE_LABELS[inner])}
                image={image}
                title={title}
              />
            ))}
        </Grid>
      </PageSection>
    </>
  );
};

export default {
  Container,
};
