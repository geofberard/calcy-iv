import * as React from "react";
import { Pokemon } from "../../data/Pokemon";
import { StateContext } from "./StateContext";

const PokemonContext = React.createContext<StateContext<Pokemon>>(null);

export const PokemonProvider: React.FC = ({ children }) => {
  const [pokemon, setPokemon] = React.useState<Pokemon>();

  return (
    <PokemonContext.Provider value={[pokemon, setPokemon]}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => React.useContext(PokemonContext);
