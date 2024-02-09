import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { Button, Tooltip } from "@mui/material";
import schema from "./Button.schema";
import { COLORS } from "../../../constants";

const Wrapper = styled(Button)`
  font-family: "Outfit", sans-serif;
  font-size: 1rem;
  border: 1px solid transparent;
  transition: background-color 0.2s ease-in-out;
  padding-left: ${({ icon }) => (icon ? 0 : 1.5)}rem;
  padding-right: ${({ icon }) => (icon ? 0 : 1.5)}rem;
  height: 2.75rem;
  min-width: 2.75rem;
  color: ${COLORS.foreground.light};
  text-decoration: none;
  display: flex;

  background-color: ${({ importance }) =>
    importance === "primary" ? COLORS.accent : COLORS.background.light};

  &:hover {
    background-color: #586485;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const Component = (props) => {
  const { label, icon, importance = "secondary", action, tooltip } = props;
  const handleClick = () => typeof action === "function" && action();

  if (typeof action === "string") {
    return (
      <Tooltip title={tooltip || ""}>
        <StyledLink to={action}>
          <Wrapper importance={importance} icon={icon}>
            {icon || label}
          </Wrapper>
        </StyledLink>
      </Tooltip>
    );
  }

  return (
    <Tooltip title={tooltip || ""}>
      <Wrapper importance={importance} icon={icon} onClick={handleClick}>
        {icon || label}
      </Wrapper>
    </Tooltip>
  );
};

Component.propTypes = schema.props;

export default {
  Component,
};
