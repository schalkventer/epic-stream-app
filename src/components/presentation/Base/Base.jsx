import { Global, css } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import schema from "./Base.schema";
import { COLORS } from "../../../constants";

const dark = createTheme({
  palette: {
    mode: "dark",
  },
});

const styles = css`
  @import url("https://fonts.googleapis.com/css2?family=Outfit:wght@300;500&display=swap");

  body {
    background: ${COLORS.background.dark};
    color: ${COLORS.foreground.medium};
    font-family: "Outfit", sans-serif;
    overflow-y: scroll;
  }
`;

/**
 *
 */
export const Component = (props) => {
  const { children } = props;

  return (
    <ThemeProvider theme={dark}>
      <CssBaseline />
      <Global styles={styles} />
      {children}
    </ThemeProvider>
  );
};

Component.propTypes = schema.props;

export default {
  Component,
};
