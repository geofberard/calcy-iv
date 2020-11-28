import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import * as React from "react";
import { FC } from "react";
import { useSpreadSheet } from "../service/useSpreadSheet";
import { AppContainer } from "./AppContainer";
import { ConfigProvider } from "./context/ConfigContext";
import { EventServiceProvider } from "./context/EventServiceContext";

const theme = createMuiTheme({
  palette: {
    error: red,
    success: green,
  },
});

export const RootApp: FC = () => {
  const isAvailable = useSpreadSheet();

  return (
    isAvailable && (
      <EventServiceProvider>
        <ConfigProvider>
          <ThemeProvider theme={theme}>
            <AppContainer />
          </ThemeProvider>
        </ConfigProvider>
      </EventServiceProvider>
    )
  );
};
