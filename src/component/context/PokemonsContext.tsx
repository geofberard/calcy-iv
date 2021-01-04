import * as React from "react";
import { Pokemon } from "../../data/Pokemon";
import { useCalceIVExport } from "../hook/useCalcIVExport";
import { LoadingView } from "../view/LoadingView";
import { useConfig } from "./ConfigContext";
import { createStateContext } from "./StateContext";

const PokemonsContext = createStateContext<Pokemon[]>();

export const PokemonsProvider: React.FC = ({ children }) => {
  const [config] = useConfig();
  const [pokemons, setPokemons] = useCalceIVExport(config.spreadsheetKey, config.pokemonSheet);

  return (
    <PokemonsContext.Provider value={[pokemons, setPokemons]}>
      {pokemons ? children : <LoadingView />}
    </PokemonsContext.Provider>
  );
};

export const usePokemons = () => React.useContext(PokemonsContext);
