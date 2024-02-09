import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import { Dialog } from "@mui/material";
import { Component as TextElement } from "../TextElement";
import { Component as Button } from "../Button";
import { COLORS } from "../../../constants";
import schema from "./OverlayContent.schema";

const styles = css`
  .OverlayContent-paper {
    width: 100%;
    max-width: 25rem;
    background: ${COLORS.background.medium} !important;
  }
`;

const Top = styled.div`
  border-bottom: 1px solid ${COLORS.background.light} !important;
  padding: 1rem;
`;

const Bottom = styled.div`
  border-top: 1px solid ${COLORS.background.light} !important;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1rem;
`;

/**
 *
 */
export const Component = (props) => {
  const { primary, secondary, onClose, title, children } = props;
  const hasButton = Boolean(primary || secondary);

  return (
    <>
      <Global styles={styles} />

      <Dialog
        open
        PaperProps={{ className: "OverlayContent-paper" }}
        onClose={onClose}
      >
        {title && (
          <Top>
            <TextElement size="l" importance="primary">
              {title}
            </TextElement>
          </Top>
        )}

        {children}

        {hasButton && (
          <Bottom>
            {secondary && (
              <Button
                label={secondary.label}
                tooltip={secondary.tooltip}
                importance="secondary"
                icon={secondary.icon}
                action={secondary.action}
              />
            )}

            {primary && (
              <Button
                label={primary.label}
                tooltip={primary.tooltip}
                importance="primary"
                icon={primary.icon}
                action={primary.action}
              />
            )}
          </Bottom>
        )}
      </Dialog>
    </>
  );
};

Component.propTypes = schema.props;
