import { Fragment } from "react";
import { ButtonBase, Skeleton } from "@mui/material";
import { format as formatDate } from "date-fns";
import styled from "@emotion/styled";

import { Component as TextElement } from "../TextElement";
import schema from "./ShowPreview.schema";
import { COLORS } from "../../../constants";

const Image = styled.img`
  width: 100%;
  height: 20rem;
  object-fit: cover;
  background: ${COLORS.background.light};
  display: block;
  line-height: 1;
`;

const Wrapper = styled(ButtonBase)`
  width: 100%;
  background: ${COLORS.background.medium};
  height: 27rem;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border-radius: 6px;
  overflow: hidden;

  &:not(disabled):hover {
    filter: brightness(1.1);
  }
`;

const Info = styled.div`
  width: 100%;
  text-align: left;
  padding: 1rem;
`;

const Title = styled.div`
  display: flex;
  margin-top: 0.25rem;
  height: 3rem;
`;

const Dot = styled.div`
  background: ${COLORS.foreground.dark};
  width: 0.25rem;
  height: 0.25rem;
  border-radius: 50%;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const TitleLoading = styled(Skeleton)`
  width: 12rem;
  height: 1rem;
`;

const GenresLoading = styled(Skeleton)`
  width: 4rem;
  height: 0.75rem;
`;

export const Component = (props) => {
  const { title, genres, image } = props;
  const trimmedGenres = genres.slice(0, 2);

  return (
    <Wrapper>
      <Image src={image} alt="" loading="lazy" />

      <Info>
        <TextElement size="s">
          {formatDate(new Date(), "dd MMM yyyy")}
        </TextElement>

        <Title>
          <TextElement size="m" importance="primary" lines={2}>
            {title}
          </TextElement>
        </Title>

        <Row>
          {trimmedGenres.slice(0, 2).map((genreName, index) => (
            <Fragment key={genreName}>
              <TextElement size="s" key={genreName}>
                {genreName}
              </TextElement>

              {index + 1 < trimmedGenres.length && <Dot />}
            </Fragment>
          ))}
        </Row>
      </Info>
    </Wrapper>
  );
};

export const Placeholder = () => (
  <Wrapper disabled>
    <Image as={Skeleton} alt="" variant="rectangular" />

    <Info>
      <TextElement size="s">
        <GenresLoading variant="rounded" />
      </TextElement>

      <Title>
        <TextElement size="m" importance="primary">
          <TitleLoading variant="rounded" />
        </TextElement>
      </Title>
    </Info>
  </Wrapper>
);

Component.propTypes = schema.props;

export default {
  Component,
  Placeholder,
};
