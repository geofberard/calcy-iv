import * as React from "react";
import { Pokemon } from "../../data/Pokemon";
import { loadPokemons } from "../../dao/PokemonDao";
import { useConfig } from "./ConfigContext";

const PokemonsContext = React.createContext<Pokemon[]>([]);

export const PokemonsProvider: React.FC = ({ children }) => {
  const [pokemons, setPokemons] = React.useState<Pokemon[]>([]);
  const config = useConfig();

  React.useEffect(() => {
    loadPokemons(
      config.spreadsheetKey,
      config.pokemonSheet
    ).then(loadedPokemons => setPokemons(loadedPokemons));
  }, [config]);

  return (
    <PokemonsContext.Provider value={pokemons}>
      {children}
    </PokemonsContext.Provider>
  );
};

export const usePokemons = () => React.useContext(PokemonsContext);
