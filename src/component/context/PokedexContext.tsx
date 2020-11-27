import * as React from "react";
import { loadPokedex } from "../../dao/PokedexDao";
import { PokedexEntry } from "../../data/PokedexEntry";
import { useConfig } from "./ConfigContext";

const PokemonsContext = React.createContext<PokedexEntry[]>([]);

export const PokedexProvider: React.FC = ({ children }) => {
  const [pokedex, setPokedex] = React.useState<PokedexEntry[]>([]);
  const config = useConfig();

  React.useEffect(() => {
    loadPokedex(
      config.spreadsheetKey,
      config.pokemonSheet
    ).then(loadedPokedex => setPokedex(loadedPokedex));
  }, [config]);

  return (
    <PokemonsContext.Provider value={pokedex}>
      {children}
    </PokemonsContext.Provider>
  );
};

export const usePokedex = () => React.useContext(PokemonsContext);
