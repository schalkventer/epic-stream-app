import { ButtonBase } from "@mui/material";
import styled from "@emotion/styled";
import { COLORS } from "../../../constants";
import { Component as ProgressLine } from "../ProgressLine";
import { Component as TextElement } from "../TextElement";

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
`;

export const Component = () => (
  <Wrapper>
    <Row>
      <Image src="https://picsum.photos/200/300" />

      <Info>
        <Title>
          <TextElement importance="primary">asd</TextElement>
        </Title>

        <TextElement size="s">ff</TextElement>
      </Info>
    </Row>
    <ProgressLine percentage={40} />
  </Wrapper>
);

export default { Component };
