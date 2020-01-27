import * as React from "react";
import { FC } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Navigation } from "./menu/Navigation";
import { useNavigation } from "./menu/useNavigation";
import { Page1View } from "./view/Page1View";
import { Page2View } from "./view/Page2View";
import { Page1, Page2 } from "../data/navigation/Pages";

const ALL_PAGES = [Page1, Page2];

const theme = createMuiTheme({
  palette: {
    error: red,
    success: green,
  },
});

export const RootApp: FC = () => {
  const [currentPage, setCurrentPage] = useNavigation(ALL_PAGES);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation pages={ALL_PAGES} currentPage={currentPage} onChange={setCurrentPage}>
        {(currentPage === Page1) && <Page1View />}
        {(currentPage === Page2) && <Page2View />}
      </Navigation>
    </ThemeProvider>
  );
};
