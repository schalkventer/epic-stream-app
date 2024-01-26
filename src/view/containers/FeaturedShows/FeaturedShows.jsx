import styled from "@emotion/styled";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

import { PageFilters } from "../../components/AppShell";
import { Component as PageSection } from "../../components/PageSection";
import { Component as ShowPreview } from "../../components/ShowPreview";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
`;

export const Container = () => (
  <>
    <PageFilters
      filters={[
        {
          label: "Search",
          value: "",
          size: "l",
        },
        {
          label: "Genres",
          value: "One",
          options: ["One", "Two", "Three"],
          size: "s",
        },
      ]}
    />

    <PageSection
      title="Featured"
      actions={[
        {
          icon: <KeyboardArrowLeft />,
        },
        {
          icon: <KeyboardArrowRight />,
        },
      ]}
    >
      asd
    </PageSection>

    <PageSection
      title="Recent"
      actions={[
        {
          label: "View All",
        },
      ]}
    >
      <Grid>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((inner) => (
          <ShowPreview
            genres={["A", "B"]}
            image="https://picsum.photos/200/300"
            key={inner}
            title={`Show ${inner}`}
          />
        ))}
      </Grid>
    </PageSection>
  </>
);

export default {
  Container,
};
