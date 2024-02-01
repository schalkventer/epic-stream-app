import styled from "@emotion/styled";
import { ArrowForward, ArrowBack } from "@mui/icons-material";
import { Component as Button } from "../../presentation/Button";
import { Component as PageSection } from "../../presentation/PageSection";
import { useData } from "./FeaturedShows.helpers";
import ShowDetails from "../../presentation/ShowDetails";
import ShowPreview from "../../presentation/ShowPreview";

const RowWrap = styled.div`
  position: relative;
  padding: 0 2rem;
  margin: 0 -2rem;

  &::after {
    content: "";
    display: flex;
    top: 0;
    right: 0;
    position: absolute;
    z-index: 10;
    height: 100%;
    width: 3rem;

    background: linear-gradient(
      90deg,
      rgba(16, 20, 30, 0) 0%,
      rgba(16, 20, 30, 1) 100%
    );
  }
`;

const Row = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0 2rem;
  margin: 0 -2rem;
  display: flex;
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Item = styled.div`
  width: 11rem;
  display: block;

  @media (min-width: 60rem) {
    display: none;
    width: 100%;

    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(3) {
      display: block;
    }
  }

  @media (min-width: 75rem) {
    &:nth-child(4) {
      display: block;
    }
  }

  @media (min-width: 90rem) {
    &:nth-child(5) {
      display: block;
    }
  }

  @media (min-width: 100rem) {
    &:nth-child(6) {
      display: block;
    }
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
      <RowWrap>
        <Row>
          {new Array(6)
            .fill(0)
            .map((val, index) => val + index)
            .map((key) => (
              <Item key={key}>
                <ShowPreview.Placeholder />
              </Item>
            ))}
        </Row>
      </RowWrap>
    </PageSection>

    <PageSection
      title="Action"
      actions={[{ label: "View All", action: "/browse?genre=Action" }]}
    >
      <RowWrap>
        <Row>
          {new Array(6)
            .fill(0)
            .map((val, index) => val + index)
            .map((key) => (
              <Item key={key}>
                <ShowPreview.Placeholder />
              </Item>
            ))}
        </Row>
      </RowWrap>
    </PageSection>

    <PageSection
      title="Comedy"
      actions={[{ label: "View All", action: "/browse?genre=Comedy" }]}
    >
      <RowWrap>
        <Row>
          {new Array(6)
            .fill(0)
            .map((val, index) => val + index)
            .map((key) => (
              <Item key={key}>
                <ShowPreview.Placeholder />
              </Item>
            ))}
        </Row>
      </RowWrap>
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
      </PageSection>

      <PageSection
        title="Nature"
        actions={[{ label: "View All", action: "/browse?genre=Nature" }]}
      >
        <RowWrap>
          <Row>
            {nature.map(({ id, image, title, genres, updated }) => (
              <Item key={id}>
                <ShowPreview.Component
                  genres={genres}
                  image={image}
                  title={title}
                  updated={updated}
                  action={`/show/${id}`}
                />
              </Item>
            ))}
          </Row>
        </RowWrap>
      </PageSection>

      <PageSection
        title="Action"
        actions={[{ label: "View All", action: "/browse?genre=Action" }]}
      >
        <RowWrap>
          <Row>
            {action.map(({ id, image, title, genres, updated }) => (
              <Item key={id}>
                <ShowPreview.Component
                  key={id}
                  genres={genres}
                  image={image}
                  title={title}
                  updated={updated}
                  action={`/show/${id}`}
                />
              </Item>
            ))}
          </Row>
        </RowWrap>
      </PageSection>

      <PageSection
        title="Comedy"
        actions={[{ label: "View All", action: "/browse?genre=Comedy" }]}
      >
        <RowWrap>
          <Row>
            {comedy.map(({ id, image, title, genres, updated }) => (
              <Item key={id}>
                <ShowPreview.Component
                  genres={genres}
                  image={image}
                  title={title}
                  updated={updated}
                  action={`/show/${id}`}
                />
              </Item>
            ))}
          </Row>
        </RowWrap>
      </PageSection>
    </>
  );
};
