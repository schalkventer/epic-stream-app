import { ButtonBase, Skeleton } from "@mui/material";
import styled from "@emotion/styled";
import { COLORS } from "../../../constants";
import { Component as ProgressLine } from "../ProgressLine";
import TextElement from "../TextElement";
import schema from "./EpisodePreview.schema";

const Wrapper = styled(ButtonBase)`
  background: ${COLORS.background.medium};
  width: 100%;
  flex-direction: column;
  overflow: hidden;
  border-radius: 6px;
  height: 5.5rem;

  &:hover {
    filter: brightness(1.2);
  }
`;

const Info = styled.div`
  text-align: left;
  flex-grow: 1;
`;

const Title = styled.div`
  padding: 0.25rem 0;
`;

const Row = styled.div`
  display: flex;
  padding: 0 1rem;
  width: 100%;
  height: 100%;
  align-items: center;
`;

const Image = styled.img`
  height: 3.5rem;
  width: 5rem;
  border-radius: 6px;
  object-fit: cover;
  margin-right: 1rem;
  display: block;
  background: ${COLORS.background.light};
`;

const Description = styled.div`
  width: 100%;
  max-width: 50rem;
  text-align: left;
  padding-right: 2rem;
`;

export const Placeholder = () => (
  <Wrapper disabled>
    <Row>
      <Image as={Skeleton} variant="rectangular" />

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
  const { image, title, subtitle, percentage, description, onClick } = props;

  return (
    <Wrapper onClick={onClick} disabled={!onClick}>
      <Row>
        <Image src={image} />

        <Info>
          <Title>
            <TextElement.Component importance="primary" size="m">
              {title}
            </TextElement.Component>
          </Title>

          <TextElement.Component size="s" importance="primary">
            {subtitle}
          </TextElement.Component>
        </Info>

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
