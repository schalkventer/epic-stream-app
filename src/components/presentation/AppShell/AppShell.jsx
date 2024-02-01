import { createGlobalState } from "react-use";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, createRef } from "react";
import styled from "@emotion/styled";
import { useSpring, animated } from "@react-spring/web";
import { Search, Close } from "@mui/icons-material";
import { ButtonBase } from "@mui/material";

import h from "./AppShell.helpers";
import schema from "./AppShell.schema";
import { COLORS, MAIN_CONTENT_WIDTH } from "../../../constants";
import { Logo } from "./AppShell.Logo";

import { Component as Button } from "../Button";
import { Component as TextElement } from "../TextElement";

const Wrapper = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1;

  box-shadow:
    rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
`;

const Inner = styled.div`
  background: ${COLORS.background.medium};
  position: 100;
  border-bottom: 1px solid ${COLORS.background.light};
  padding: 0 2rem;

  @media (min-width: 80rem) {
    padding: 0 4rem;
  }
`;

const TopBar = styled.header`
  height: ${h.BAR_HEIGHT};
  display: flex;
  align-items: center;
  width: 100%;
  max-width: ${MAIN_CONTENT_WIDTH};
  margin: 0 auto;
`;

const LinkButton = styled(ButtonBase)`
  height: 100%;
  padding: 0 1rem;
  border-top: 2px solid transparent;

  border-bottom: 2px solid
    ${({ disabled }) => (disabled ? COLORS.accent : "transparent")};

  &:not(:disabled):hover {
    background: ${COLORS.background.light};
  }
`;

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: ${COLORS.background.medium};
  height: ${h.BAR_HEIGHT};
  display: flex;
  justify-content: center;
  z-index: 1;
  border-top: 1px solid ${COLORS.background.light};

  box-shadow:
    rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px,
    rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px,
    rgba(0, 0, 0, 0.09) 0px -3px 5px;

  @media (min-width: ${h.BREAKPOINT}) {
    position: static;
    justify-content: flex-start;
    background: none;
    box-shadow: none;
    border-top-color: transparent;
  }
`;

const List = styled.ul`
  height: 100%;
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Item = styled.li`
  height: 100%;
`;

const End = styled.div`
  flex-grow: 1;
  justify-content: flex-end;
  display: flex;
`;

const Floating = styled(animated.div)`
  position: absolute;
  left: 0;
  width: 100%;
  z-index: -1;

  box-shadow:
    rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
`;

const Main = styled.main`
  padding-bottom: 20rem;
`;

const ref = createRef();

export const Presentation = (props) => {
  const { children, handleSearch, open, top, active } = props;

  return (
    <>
      <Wrapper>
        <Inner>
          <TopBar>
            <Logo />

            <Nav>
              <List>
                {h.LINKS.map(({ url, label }) => (
                  <Item key={url}>
                    <LinkButton as={Link} to={url} disabled={url === active}>
                      <TextElement importance="primary">{label}</TextElement>
                    </LinkButton>
                  </Item>
                ))}
              </List>
            </Nav>

            <End>
              <Button
                action={handleSearch}
                icon={open ? <Close /> : <Search />}
              />
            </End>
          </TopBar>
        </Inner>

        <Floating open={open} style={{ top }}>
          <Inner id={h.PORTAL_ID} ref={ref} />
        </Floating>
      </Wrapper>

      <Main>{children}</Main>
    </>
  );
};

export const useOpen = createGlobalState(false);

export const Component = (props) => {
  const { children } = props;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useOpen();

  const { top } = useSpring({
    from: { top: "100%" },
    to: { top: open ? "100%" : "-250%" },
  });

  useEffect(() => {
    const handler = (event) => {
      if (event.key !== "Escape") return;
      if (!open) return;
      setOpen(false);
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  });

  useEffect(() => {
    if (!open) return;
    const node = document.querySelector('[data-user-entry-identifier="0"]');
    if (node) node.focus();
  }, [open]);

  const handleSearch = () => {
    if (ref.current.children.length < 1) {
      return navigate("/browse?&genre=All&sort=A-Z");
    }

    return setOpen((current) => !current);
  };

  return (
    <Presentation
      top={top}
      open={open}
      handleSearch={handleSearch}
      active={pathname}
    >
      {children}
    </Presentation>
  );
};

Presentation.propTypes = schema.presentation;
Component.propTypes = schema.props;
