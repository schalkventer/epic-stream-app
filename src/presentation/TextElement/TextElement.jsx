import styled from "@emotion/styled";
import { Typography, Skeleton } from "@mui/material";
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
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({ lines }) => lines};
  overflow: hidden;
`;

const calcSkeletonHeight = (size) => {
  switch (size) {
    case "s":
      return "0.7rem";

    case "m":
      return "1.2rem";

    case "l":
      return "1.5rem";

    default:
      throw new Error(`Invalid size: ${size}`);
  }
};

const calcSkeletonPadding = (size) => {
  switch (size) {
    case "s":
      return "0.22rem 0";

    case "m":
      return "0.15rem 0";

    case "l":
      return "0.3rem 0";

    default:
      throw new Error(`Invalid size: ${size}`);
  }
};

const Loading = styled(Skeleton)`
  width: 100%;
  height: ${({ size }) => calcSkeletonHeight(size)};
`;

const LoadingWrapper = styled.div`
  padding: ${({ size }) => calcSkeletonPadding(size)};
`;

/**
 *
 */
export const Component = (props) => {
  const { children, size = "m", importance = "secondary", lines = 0 } = props;

  if (typeof children === "number") {
    return <Placeholder size={size} variant="rounded" width={children * 16} />;
  }

  return (
    <Wrapper size={size} importance={importance} lines={lines}>
      {children}
    </Wrapper>
  );
};

/**
 *
 */
export const Placeholder = (props) => {
  const { size = "m", width } = props;

  return (
    <LoadingWrapper size={size}>
      <Loading size={size} variant="rounded" width={width * 16} />
    </LoadingWrapper>
  );
};

Placeholder.propTypes = schema.placeholder;
Component.propTypes = schema.props;

export default {
  Component,
};
