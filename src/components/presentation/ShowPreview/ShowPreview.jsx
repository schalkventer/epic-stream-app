import { Fragment } from "react";
import { ButtonBase, Skeleton } from "@mui/material";
import { format as formatDate } from "date-fns";
import styled from "@emotion/styled";

import TextElement from "../TextElement";
import schema from "./ShowPreview.schema";
import { COLORS } from "../../../constants";

const Image = styled.img`
  width: 100%;
  height: 11rem;
  object-fit: cover;
  background: ${COLORS.background.light};
  display: block;
  line-height: 1;
  min-width: 11rem;

  @media (min-width: 80rem) {
    height: 21rem;
  }
`;

const Wrapper = styled(ButtonBase)`
  width: 100%;
  min-width: 11rem;
  background: ${COLORS.background.medium};
  height: 20rem;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border-radius: 6px;
  overflow: hidden;

  &:not(disabled):hover {
    filter: brightness(1.1);
  }

  @media (min-width: 80rem) {
    height: 30rem;
  }
`;

const Info = styled.div`
  width: 100%;
  text-align: left;
  padding: 1rem;
`;

const Title = styled.div`
  display: block;
  margin-top: 0.25rem;
  height: 3.5rem;
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

const ImageWrap = styled.div`
  width: 100%;
`;

export const Component = (props) => {
  const { title, genres, image, updated, seasons } = props;

  return (
    <Wrapper>
      <ImageWrap>
        <Image src={image} alt="" loading="lazy" />
      </ImageWrap>

      <Info>
        <TextElement.Component size="s">
          {seasons} Season{seasons > 1 && "s"}
        </TextElement.Component>

        <Title>
          <TextElement.Component size="m" importance="primary" lines={2}>
            {title}
          </TextElement.Component>
        </Title>

        <TextElement.Component size="s">
          {formatDate(updated, "d MMM yyyy")}
        </TextElement.Component>

        <Row>
          {genres.map((genreName, index) => (
            <Fragment key={genreName}>
              <TextElement.Component size="s" key={genreName}>
                {genreName}
              </TextElement.Component>

              {index + 1 < genres.length && <Dot />}
            </Fragment>
          ))}
        </Row>
      </Info>
    </Wrapper>
  );
};

export const Placeholder = () => (
  <Wrapper disabled>
    <ImageWrap>
      <Image as={Skeleton} alt="" variant="rectangular" />
    </ImageWrap>

    <Info>
      <TextElement.Placeholder size="s" width={3} />

      <Title>
        <TextElement.Placeholder size="m" width={8} />
      </Title>

      <TextElement.Placeholder size="s" width={4} />

      <Row>
        <TextElement.Placeholder size="s" width={8} />
      </Row>
    </Info>
  </Wrapper>
);

Component.propTypes = schema.props;

export default {
  Component,
  Placeholder,
};
