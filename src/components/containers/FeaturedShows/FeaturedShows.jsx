import styled from "@emotion/styled";
import { ArrowForward, ArrowBack } from "@mui/icons-material";
import { Component as Button } from "../../presentation/Button";
import { Component as PageSection } from "../../presentation/PageSection";
import { useData } from "./FeaturedShows.helpers";
import ShowDetails from "../../presentation/ShowDetails";
import ShowPreview from "../../presentation/ShowPreview";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;

  @media (min-width: 40rem) {
    grid-template-columns: repeat(3, 1fr);
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
    <PageSection
      title="Featured"
      actions={[
        {
          icon: <ArrowBack />,
          action: false,
        },
        { icon: <ArrowForward />, action: false },
      ]}
    >
      <ShowDetails.Placeholder />
    </PageSection>

    <PageSection
      title="Nature"
      actions={[{ label: "View All", action: "/browse?genre=Nature" }]}
    >
      <Grid>
        {new Array(6)
          .fill(0)
          .map((val, index) => val + index)
          .map((key) => (
            <ShowPreview.Placeholder key={key} />
          ))}
      </Grid>
    </PageSection>

    <PageSection
      title="Action"
      actions={[{ label: "View All", action: "/browse?genre=Action" }]}
    >
      <Grid>
        {new Array(6)
          .fill(0)
          .map((val, index) => val + index)
          .map((key) => (
            <ShowPreview.Placeholder key={key} />
          ))}
      </Grid>
    </PageSection>

    <PageSection
      title="Comedy"
      actions={[{ label: "View All", action: "/browse?genre=Comedy" }]}
    >
      <Grid>
        {new Array(6)
          .fill(0)
          .map((val, index) => val + index)
          .map((key) => (
            <ShowPreview.Placeholder key={key} />
          ))}
      </Grid>
    </PageSection>
  </>
);

/**
 *
 */
export const Component = () => {
  const { action, comedy, featured, move, nature, status } = useData();
  if (status === "LOADING") return <Loading />;

  return (
    <>
      <PageSection
        title="Featured"
        actions={[
          {
            icon: <ArrowBack />,
            action: () => move("left"),
          },
          { icon: <ArrowForward />, action: () => move("right") },
        ]}
      >
        {featured && (
          <ShowDetails.Component
            key={featured.id}
            seasons={featured.seasons}
            description={featured.description}
            genres={featured.genres}
            image={featured.image}
            title={featured.title}
            updated={featured.updated}
          >
            <Button
              label="Watch Now"
              importance="primary"
              action={`/show?id=${featured.id}`}
            />
          </ShowDetails.Component>
        )}
      </PageSection>

      <PageSection
        title="Nature"
        actions={[{ label: "View All", action: "/browse?genre=Nature" }]}
      >
        <Grid>
          {nature &&
            nature.map(({ id, image, title, genres, updated }) => (
              <ShowPreview.Component
                key={id}
                genres={genres}
                image={image}
                title={title}
                updated={updated}
              />
            ))}
        </Grid>
      </PageSection>

      <PageSection
        title="Action"
        actions={[{ label: "View All", action: "/browse?genre=Action" }]}
      >
        <Grid>
          {action &&
            action.map(({ id, image, title, genres, updated }) => (
              <ShowPreview.Component
                key={id}
                genres={genres}
                image={image}
                title={title}
                updated={updated}
              />
            ))}
        </Grid>
      </PageSection>

      <PageSection
        title="Comedy"
        actions={[{ label: "View All", action: "/browse?genre=Comedy" }]}
      >
        <Grid>
          {comedy &&
            comedy.map(({ id, image, title, genres, updated }) => (
              <ShowPreview.Component
                key={id}
                genres={genres}
                image={image}
                title={title}
                updated={updated}
              />
            ))}
        </Grid>
      </PageSection>
    </>
  );
};
