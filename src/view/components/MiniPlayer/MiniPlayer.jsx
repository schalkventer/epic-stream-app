import styled from "@emotion/styled";
import { PlayArrow } from "@mui/icons-material";
import { COLORS } from "../../../constants";

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

export const Component = () => (
  <Wrapper>
    <Row>
      <Button icon={<PlayArrow />} />
      <Start>
        <TextElement importance="inherit" size="s">
          00:00
        </TextElement>
      </Start>

      <ProgressLine percentage={40} />

      <End>
        <TextElement importance="inherit" size="s">
          00:00
        </TextElement>
      </End>

      <div>
        <Image src="https://picsum.photos/200/300" />
      </div>

      <div>
        <Info>
          <Title>
            <TextElement importance="primary">asd</TextElement>
          </Title>

          <TextElement size="s">ff</TextElement>
        </Info>
      </div>
    </Row>
  </Wrapper>
);

export default {
  Component,
};
