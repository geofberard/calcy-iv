import * as React from "react";
import { Pokemon } from "../../data/Pokemon";
import { loadPokemons } from "../dao/PokemonDao";

const PokemonsContext = React.createContext<Pokemon[]>([]);

export const PokemonsProvider: React.FC = ({ children }) => {
  const [pokemons, setPokemons] = React.useState<Pokemon[]>([]);

  React.useEffect(() => {
    loadPokemons().then(loadedPokemons => setPokemons(loadedPokemons));
  }, []);

  return (
    <PokemonsContext.Provider value={pokemons}>
      {children}
    </PokemonsContext.Provider>
  );
};

export const usePokemons = () => React.useContext(PokemonsContext);
