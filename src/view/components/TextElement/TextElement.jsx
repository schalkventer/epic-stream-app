import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import schema from "./TextElement.schema";
import h from "./TextElement.helpers";

const Wrapper = styled(Typography)`
  font-family: "Outfit", sans-serif;
  line-height: ${({ size }) => h.calcLineHeight(size)};
  font-weight: ${({ size }) => (size === "m" ? 500 : 300)};
  font-size: ${({ size }) => h.calcSize(size)};
  color: ${({ importance }) => h.calcImportance(importance)};
  letter-spacing: ${({ size }) => (size === "l" ? "-0.025rem" : 0)};
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => props.lines || "initial"};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

/**
 *
 */
export const Component = (props) => {
  const { children, size = "m", importance = "secondary", lines } = props;

  return (
    <Wrapper size={size} importance={importance} lines={lines}>
      {children}
    </Wrapper>
  );
};

Component.propTypes = schema.props;

export default {
  Component,
};
