import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";
import * as React from "react";
import { FC } from "react";
import { GridView, TableView } from "../data/navigation/Pages";
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

const theme = createMuiTheme({
  palette: {
    error: red,
    success: green,
  },
});

const ALL_PAGES = [TableView, GridView];

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
            {currentPage === TableView && <PokemonListView />}
            {currentPage === GridView && <PokemonGridView />}
          </Navigation>
        </Providers>
      </ThemeProvider>
    )
  );
};
