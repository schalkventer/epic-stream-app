import styled from "@emotion/styled";
import { useSpring, animated } from "@react-spring/web";
import { useToggle } from "react-use";
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

  &:hover {
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

  @media (min-width: ${h.BREAKPOINT}) {
    position: static;
    justify-content: flex-start;
    background: none;
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

export const Presentation = (props) => {
  const { children, toggleOpen, open, top } = props;

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
                    <LinkButton>
                      <TextElement importance="primary">{label}</TextElement>
                    </LinkButton>
                  </Item>
                ))}
              </List>
            </Nav>

            <End>
              <Button
                action={toggleOpen}
                icon={open ? <Close /> : <Search />}
              />
            </End>
          </TopBar>
        </Inner>

        <Floating open={open} style={{ top }}>
          <Inner id={h.PORTAL_ID} />
        </Floating>
      </Wrapper>

      <Main>{children}</Main>
    </>
  );
};

export const Component = (props) => {
  const { children, filters } = props;
  const [open, toggleOpen] = useToggle(false);

  const { top } = useSpring({
    from: { top: "-150%" },
    to: { top: open ? "100%" : "-150%" },
  });

  return (
    <Presentation
      top={top}
      filters={filters}
      open={open}
      toggleOpen={toggleOpen}
    >
      {children}
    </Presentation>
  );
};

Presentation.propTypes = schema.presentation;
Component.propTypes = schema.props;
