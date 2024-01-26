import styled from "@emotion/styled";
import tokens from "../../../constants";
import schema from "./ProgressLine.schema";

const Wrapper = styled.div`
  overflow: hidden;
  height: 5px;
  width: 100%;
  border-radius: 10px;
  background: ${tokens.colors.background.light};
  position: relative;
`;

const Overlay = styled.div`
  height: 100%;
  border-radius: 10px;
  width: ${({ percentage }) => percentage}%;
  background: ${tokens.colors.accent};
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
