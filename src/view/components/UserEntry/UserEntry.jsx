import styled from "@emotion/styled";

import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import schema from "./UserEntry.schema";
import { COLORS } from "../../../constants";

const Wrapper = styled(FormControl)`
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
  background: ${COLORS.background.medium};
  border: 1px solid transparent;

  &:hover {
    background: ${COLORS.background.light};
  }

  &:focus,
  &:active,
  &:focus-within {
    border: 1px solid ${COLORS.foreground.dark};
  }

  & .MuiInputBase-root::after,
  & .MuiInputBase-root::before {
    display: none;
  }

  &:focus-within {
    border: 1px solid white;
  }

  & .MuiFormLabel-root {
    color: ${COLORS.foreground.medium} !important;
  }

  & .MuiInputLabel-shrink {
    color: ${COLORS.foreground.medium};
  }

  & .MuiInputBase-input {
    color: ${COLORS.foreground.light};
    font-weight: 500;
  }
`;

export const Component = (props) => {
  const { options, label, value, size = "l", onChange } = props;

  const handleChange = ({ target }) => {
    onChange(target.value);
  };

  if (options) {
    return (
      <Wrapper variant="filled" fullWidth size={size}>
        <InputLabel id={label}>{label}</InputLabel>

        <Select
          labelId={label}
          id={`${label}-select`}
          as={Select}
          value={value}
          onChange={handleChange}
        >
          {options.map((inner) => (
            <MenuItem key={inner} value={inner}>
              {inner}
            </MenuItem>
          ))}
        </Select>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <TextField
        fullWidth
        label={label}
        value={value}
        variant="filled"
        onChange={handleChange}
      />
    </Wrapper>
  );
};

Component.propTypes = schema.props;

export default {
  Component,
};
