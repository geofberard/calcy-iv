import CssBaseline from "@material-ui/core/CssBaseline";
import * as React from "react";
import { FC } from "react";
import { Page1, Page2 } from "../data/navigation/Pages";
import { useConfig } from "./context/ConfigContext";
import { PokedexProvider } from "./context/PokedexContext";
import { PokemonsProvider } from "./context/PokemonsContext";
import { Navigation } from "./menu/Navigation";
import { useNavigation } from "./menu/useNavigation";
import { ConfigView } from "./view/ConfigView";
import { Page2View } from "./view/Page2View";
import { PokemonListView } from "./view/PokemonListView";
import { SearchQueryProvider } from "./context/SearchQueryContext";

const ALL_PAGES = [Page1, Page2];

export const AppContainer: FC = () => {
  const [currentPage, setCurrentPage] = useNavigation(ALL_PAGES);
  const [config] = useConfig();

  return !config ? (
    <ConfigView />
  ) : (
    <PokemonsProvider>
      <PokedexProvider>
        <SearchQueryProvider>
          <CssBaseline />
          <Navigation
            pages={ALL_PAGES}
            currentPage={currentPage}
            onChange={setCurrentPage}
          >
            {currentPage === Page1 && <PokemonListView />}
            {currentPage === Page2 && <Page2View />}
          </Navigation>
        </SearchQueryProvider>
      </PokedexProvider>
    </PokemonsProvider>
  );
};
