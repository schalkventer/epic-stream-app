import styled from "@emotion/styled";
import { PlayArrow } from "@mui/icons-material";
import { COLORS } from "../../../constants";

import schema from "./MiniPlayer.schema";
import { Component as ProgressLine } from "../ProgressLine";
import { Component as TextElement } from "../TextElement";
import { Component as Button } from "../Button";

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
`;

const Image = styled.img`
  height: 4rem;
  width: 6rem;
  border-radius: 6px;
  object-fit: cover;
  margin: 0 1rem;
  display: block;
`;

const MINUTE_AS_SECONDS = 60;
const HOUR_AS_SECONDS = MINUTE_AS_SECONDS * 60;

const toTimeString = (seconds) => {
  const hour = Math.floor(seconds / HOUR_AS_SECONDS);
  const minutes = Math.floor((seconds % HOUR_AS_SECONDS) / MINUTE_AS_SECONDS);

  const remainingSeconds = Math.floor(
    (seconds % HOUR_AS_SECONDS) % MINUTE_AS_SECONDS,
  );

  return [hour, minutes, remainingSeconds]
    .map((inner) => inner.toString().padStart(2, "0"))
    .join(":");
};

export const Component = (props) => {
  const { onStart, progress, total, image, title, subtitle } = props;
  const progressAsSeconds = (total / progress) * 100;

  return (
    <Wrapper>
      <Row>
        <Button icon={<PlayArrow />} action={onStart} />

        <Start>
          <TextElement importance="inherit" size="m">
            {toTimeString(progressAsSeconds)}
          </TextElement>
        </Start>

        <ProgressLine percentage={40} />

        <End>
          <TextElement importance="inherit" size="s">
            {toTimeString(total)}
          </TextElement>
        </End>

        <div>
          <Image src={image} />
        </div>

        <div>
          <Info>
            <Title>
              <TextElement importance="primary">{title}</TextElement>
            </Title>

            <TextElement size="s">{subtitle}</TextElement>
          </Info>
        </div>
      </Row>
    </Wrapper>
  );
};

Component.propTypes = schema.props;
