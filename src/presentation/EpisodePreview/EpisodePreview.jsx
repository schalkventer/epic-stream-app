import { ButtonBase, Skeleton } from "@mui/material";
import { Star } from "@mui/icons-material";
import styled from "@emotion/styled";
import { COLORS } from "../../constants";
import { Component as ProgressLine } from "../ProgressLine";
import TextElement from "../TextElement";
import schema from "./EpisodePreview.schema";

const Wrapper = styled(ButtonBase)`
  background: ${COLORS.background.medium};
  width: 100%;
  flex-direction: column;
  overflow: hidden;
  border-radius: 6px;
  height: 10rem;

  &:hover {
    filter: brightness(1.2);
  }

  @media (min-width: 50rem) {
    height: 5.5rem;
  }
`;

const Info = styled.div`
  text-align: left;
  flex-grow: 1;
`;

const Title = styled.div`
  padding: 0.25rem 1rem 0.5rem 0;
  max-width: 30rem;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: flex-start;
  padding: 1rem;
  flex-wrap: wrap;

  @media (min-width: 50rem) {
    padding: 0 1rem;
    align-items: center;
  }
`;

const Image = styled.img`
  display: none;
  height: 3.5rem;
  width: 5rem;
  border-radius: 6px;
  object-fit: cover;
  margin-right: 1rem;
  background: ${COLORS.background.light};

  @media (min-width: 50rem) {
    display: block;
  }
`;

const Description = styled.div`
  width: 100%;
  max-width: 70rem;
  text-align: left;
  padding-right: 2rem;
`;

const IconWrap = styled.div`
  width: 3rem;
  height: 2rem;
  display: flex;
  align-items: center;
  color: white;
`;

export const Placeholder = () => (
  <Wrapper disabled>
    <Row>
      <div>
        <Image as={Skeleton} variant="rectangular" />
      </div>

      <Info>
        <Title>
          <TextElement.Placeholder size="m" width={8} />
        </Title>

        <TextElement.Placeholder size="s" width={4} />
      </Info>
    </Row>

    <ProgressLine percentage={0} />
  </Wrapper>
);

export const Component = (props) => {
  const {
    image,
    title,
    subtitle,
    percentage,
    description,
    onClick,
    favourited,
  } = props;

  return (
    <Wrapper onClick={onClick} disabled={!onClick}>
      <Row>
        <div>
          <Image src={image} />
        </div>

        <Info>
          <Title>
            <TextElement.Component importance="primary" size="m" lines={2}>
              {title}
            </TextElement.Component>
          </Title>

          <TextElement.Component size="s" importance="primary">
            {subtitle}
          </TextElement.Component>
        </Info>

        <div>
          <IconWrap>{favourited && <Star />}</IconWrap>
        </div>

        <Description>
          <TextElement.Component size="s" lines={2}>
            {description}
          </TextElement.Component>
        </Description>
      </Row>
      <ProgressLine percentage={percentage} />
    </Wrapper>
  );
};

Component.propTypes = schema.props;
