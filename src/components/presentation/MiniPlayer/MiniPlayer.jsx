import styled from "@emotion/styled";
import { PlayArrow } from "@mui/icons-material";
import { COLORS, MAIN_CONTENT_WIDTH } from "../../../constants";

import schema from "./MiniPlayer.schema";
import { Component as ProgressLine } from "../ProgressLine";
import { Component as TextElement } from "../TextElement";
import { Component as Button } from "../Button";
import progress from "../../../data/progress";

const Wrapper = styled.div`
  background: ${COLORS.background.medium};
  width: 100%;
  flex-direction: column;
  overflow: hidden;
  height: 5rem;
`;

const Start = styled.div`
  padding: 0 1rem 0 2rem;
  color: ${COLORS.accent};
`;

const End = styled.div`
  padding: 0 3rem 0 1rem;
`;

const Info = styled.div`
  text-align: left;
  width: 18rem;
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
  max-width: ${MAIN_CONTENT_WIDTH};
  margin: 0 auto;
`;

const Image = styled.img`
  height: 4rem;
  width: 6rem;
  border-radius: 6px;
  object-fit: cover;
  margin: 0 1rem;
  display: block;
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
        <Button icon={<PlayArrow />} action={onStart} />

        <Start>
          <TextElement importance="inherit" size="m">
            {progress.helpers.convertTime.toHourString(seconds)}
          </TextElement>
        </Start>

        <ProgressLine percentage={progress} />

        <End>
          <TextElement importance="inherit" size="s">
            {progress.helpers.convertTime.toHourString(total)}
          </TextElement>
        </End>

        <div>
          <Image src={image} />
        </div>

        <div>
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
        </div>
      </Row>
    </Wrapper>
  );
};

Component.propTypes = schema.props;
