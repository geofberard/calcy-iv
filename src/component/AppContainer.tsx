import CssBaseline from "@material-ui/core/CssBaseline";
import * as React from "react";
import { FC } from "react";
import { TableView, GridView } from "../data/navigation/Pages";
import { useConfig } from "./context/ConfigContext";
import { PokedexProvider } from "./context/PokedexContext";
import { PokemonsProvider } from "./context/PokemonsContext";
import { Navigation } from "./menu/Navigation";
import { useNavigation } from "./menu/useNavigation";
import { ConfigView } from "./view/ConfigView";
import { Page2View } from "./view/Page2View";
import { PokemonListView } from "./view/PokemonListView";
import { SearchQueryProvider } from "./context/SearchQueryContext";

const ALL_PAGES = [TableView, GridView];

export const AppContainer: FC = () => {
  const [currentPage, setCurrentPage] = useNavigation(ALL_PAGES);
  const [config] = useConfig();

  return !config ? (
    <ConfigView />
  ) : (
    <PokedexProvider>
      <PokemonsProvider>
        <SearchQueryProvider>
          <CssBaseline />
          <Navigation
            pages={ALL_PAGES}
            currentPage={currentPage}
            onChange={setCurrentPage}
          >
            {currentPage === TableView && <PokemonListView />}
            {currentPage === GridView && <Page2View />}
          </Navigation>
        </SearchQueryProvider>
      </PokemonsProvider>
    </PokedexProvider>
  );
};
