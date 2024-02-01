import styled from "@emotion/styled";
import { COLORS } from "../../../constants";
import schema from "./ProgressLine.schema";

const Wrapper = styled.div`
  overflow: hidden;
  height: 5px;
  width: 100%;
  border-radius: 10px;
  background: ${COLORS.background.light};
  position: relative;
`;

const Overlay = styled.div`
  height: 100%;
  border-radius: 10px;
  width: ${({ percentage }) => percentage}%;
  background: ${COLORS.accent};
`;

export const Component = (props) => {
  const { percentage } = props;

  return (
    <Wrapper>
      <Overlay percentage={percentage} />
    </Wrapper>
  );
};

Component.propTypes = schema.props;

export default {
  Component,
};
