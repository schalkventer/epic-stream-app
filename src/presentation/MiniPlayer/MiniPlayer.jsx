import styled from "@emotion/styled";
import { PlayArrow } from "@mui/icons-material";
import { COLORS, MAIN_CONTENT_WIDTH } from "../../constants";

import schema from "./MiniPlayer.schema";
import { Component as ProgressLine } from "../ProgressLine";
import { Component as Button } from "../Button";
import { Component as TextElement } from "../TextElement";
import progress from "../../data/progress";

const Wrapper = styled.div`
  background: ${COLORS.background.medium};
  width: 100%;
  flex-direction: column;
  overflow: hidden;
  height: 5rem;
  color: white;
  cursor: pointer;
  padding: 0 1rem;
`;

const Start = styled.div`
  display: none;
  padding: 0 1rem 0 2rem;
  color: ${COLORS.accent};

  @media (min-width: 50rem) {
    display: block;
  }
`;

const End = styled.div`
  display: none;
  padding: 0 3rem 0 1rem;

  @media (min-width: 50rem) {
    display: block;
  }
`;

const Info = styled.div`
  text-align: right;
  width: 100%;

  @media (min-width: 50rem) {
    display: block;
    width: 15rem;
  }
`;

const Title = styled.div`
  padding: 0.25rem 0;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  max-width: ${MAIN_CONTENT_WIDTH};
  margin: 0 auto;
  justify-content: space-between;

  @media (min-width: 50rem) {
    padding: 0 4rem;
  }
`;

const Image = styled.img`
  height: 4rem;
  width: 6rem;
  border-radius: 6px;
  object-fit: cover;
  display: block;
  margin-left: 1rem;
`;

// const Button = styled.div`
//   display: none;
//   background: ${COLORS.background.light};
//   height: 2.75rem;
//   width: 2.75rem;
//   border-radius: 6px;
//   align-items: center;
//   justify-content: center;

//   @media (min-width: 50rem) {
//     display: flex;
//   }
// `;

const ProgressWrap = styled.div`
  width: 100%;
`;

export const Component = (props) => {
  const {
    onStart,
    progress: percentage,
    total,
    image,
    title,
    subtitle,
  } = props;

  const seconds = (percentage / 100) * total;

  return (
    <Wrapper>
      <Row>
        <Button icon={<PlayArrow />} label={null} action={onStart} />

        <Start>
          <TextElement importance="inherit" size="m">
            {progress.helpers.convert.toHourString(seconds)}
          </TextElement>
        </Start>

        <ProgressWrap>
          <ProgressLine percentage={percentage}>1</ProgressLine>
        </ProgressWrap>

        <End>
          <TextElement importance="inherit" size="s">
            {progress.helpers.convert.toHourString(total)}
          </TextElement>
        </End>

        <Info>
          <Title>
            <TextElement importance="primary" lines={1}>
              {title}
            </TextElement>
          </Title>

          <TextElement size="s" lines={1}>
            {subtitle}
          </TextElement>
        </Info>

        <Image src={image} />
      </Row>
    </Wrapper>
  );
};

Component.propTypes = schema.props;
