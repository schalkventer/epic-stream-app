import { useState } from "react";
import { useMount } from "react-use";
import { createPortal } from "react-dom";
import styled from "@emotion/styled";
import { MAIN_CONTENT_WIDTH } from "../../../constants";
import { Component as UserEntry } from "../UserEntry";
import schema from "./AppShell.schema";
import h from "./AppShell.helpers";

const Wrapper = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: ${MAIN_CONTENT_WIDTH};
  margin: 0 auto;
  padding: 0.5rem 0;
  gap: 0.25rem;
  justify-content: flex-end;
  flex-direction: column;

  @media (min-width: ${h.BREAKPOINT}) {
    flex-direction: row;
  }
`;

const FilterWrap = styled.div`
  width: 100%;

  @media (min-width: ${h.BREAKPOINT}) {
    max-width: ${({ size }) => h.FILTERS_SIZES[size]};
  }
`;

/**
 *
 */
const Inner = (props) => {
  const { filters } = props;

  return (
    <Wrapper>
      {filters.map(({ label, options, value, size, onChange }) => (
        <FilterWrap key={label} size={size}>
          <UserEntry
            label={label}
            options={options}
            value={value}
            onChange={onChange}
          />
        </FilterWrap>
      ))}
    </Wrapper>
  );
};

Inner.propTypes = schema.pageFilters;

/**
 *
 */
export const PageFilters = (props) => {
  const { filters } = props;
  const [html, setHtml] = useState(null);

  useMount(() => {
    setHtml(document.querySelector(`#${h.PORTAL_ID}`));
  });

  if (!html) return null;
  return createPortal(<Inner filters={filters} />, html);
};

PageFilters.propTypes = schema.pageFilters;

export default {
  PageFilters,
};
