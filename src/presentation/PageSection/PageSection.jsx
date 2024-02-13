import styled from "@emotion/styled";
import schema from "./PageSection.schema";

import { Component as TextElement } from "../TextElement";
import { Component as Button } from "../Button";
import { MAIN_CONTENT_WIDTH } from "../../constants";

const Wrapper = styled.div`
  width: 100%;
  max-width: ${MAIN_CONTENT_WIDTH};
  margin: 0 auto;
  padding: 0 1rem;
  overflow: hidden;

  @media (min-width: 80rem) {
    padding: 0 4rem;
  }
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  max-width: ${MAIN_CONTENT_WIDTH};
  margin: 0 auto;
  padding: 4rem 0 1rem;
  height: 6rem;

  @media (min-width: 80rem) {
    height: 8rem;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const Component = (props) => {
  const { title, actions = [], children } = props;

  return (
    <Wrapper>
      <Row>
        <TextElement size="l" importance="primary" as="h2">
          {title}
        </TextElement>

        <Actions>
          {actions.map(({ action, icon, importance, label }, index) => (
            <Button
              key={index.toString()}
              action={action}
              icon={icon}
              importance={importance}
              label={label}
            />
          ))}
        </Actions>
      </Row>

      {children}
    </Wrapper>
  );
};

Component.propTypes = schema.props;

export default {
  Component,
};
