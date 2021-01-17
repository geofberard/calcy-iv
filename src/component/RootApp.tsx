import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";
import * as React from "react";
import { FC } from "react";
import { GridView, TableView, UpdateView } from "../data/navigation/Pages";
import { useSpreadSheet } from "../service/useSpreadSheet";
import { ConfigProvider } from "./context/ConfigContext";
import { EventServiceProvider } from "./context/EventServiceContext";
import { ModeProvider } from "./context/ModeContext";
import { PokedexProvider } from "./context/PokedexContext";
import { PokemonProvider } from "./context/PokemonContext";
import { PokemonsProvider } from "./context/PokemonsContext";
import { SortingProvider } from "./context/SortingContext";
import { Providers } from "./context/Providers";
import { SearchQueryProvider } from "./context/SearchQueryContext";
import { SelectedPokemonsProvider } from "./context/SelectedPokemonsContext";
import { Navigation } from "./menu/Navigation";
import { useNavigation } from "./menu/useNavigation";
import { PokemonGridView } from "./view/PokemonGridView";
import { PokemonListView } from "./view/PokemonListView";
import { PokemonUpdateView } from "./view/PokemonUpdateView";

const theme = createMuiTheme({
  typography: {
    h5: { fontSize: "1.2rem" },
    h6: { fontSize: "1rem" },
    body1: { fontSize: "0.8rem" },
    body2: { fontSize: "0.7rem" },
  },
  palette: {
    success: {
      light: "#dcedc8",
      main: "#a5d6a7",
    },
    error: {
      light: "#ffcdd2",
      main: "#ef9a9a",
    },
    warning: {
      light: "#ffe0b2",
      main: "#ffcc80",
    },
  },
});

const ALL_PAGES = [GridView, TableView, UpdateView];

export const RootApp: FC = () => {
  const [currentPage, setCurrentPage] = useNavigation(ALL_PAGES);
  const isAvailable = useSpreadSheet();

  return (
    isAvailable && (
      <ThemeProvider theme={theme}>
        <Providers
          combining={[
            EventServiceProvider,
            ConfigProvider,
            PokedexProvider,
            PokemonsProvider,
            ModeProvider,
            SearchQueryProvider,
            PokemonProvider,
            SelectedPokemonsProvider,
            SortingProvider,
          ]}
        >
          <CssBaseline />
          <Navigation
            pages={ALL_PAGES}
            currentPage={currentPage}
            onChange={setCurrentPage}
          >
            {currentPage === GridView && <PokemonGridView />}
            {currentPage === TableView && <PokemonListView />}
            {currentPage === UpdateView && <PokemonUpdateView />}
          </Navigation>
        </Providers>
      </ThemeProvider>
    )
  );
};
