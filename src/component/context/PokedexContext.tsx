import * as React from "react";
import { loadPokedex } from "../../dao/PokedexDao";
import { PokedexEntry } from "../../data/PokedexEntry";

const PokemonsContext = React.createContext<PokedexEntry[]>([]);

export const PokedexProvider: React.FC = ({ children }) => {
  const [pokedex, setPokedex] = React.useState<PokedexEntry[]>([]);

console.log(pokedex);

  React.useEffect(() => {
    loadPokedex().then(loadedPokedex => setPokedex(loadedPokedex));
  }, []);

  return (
    <PokemonsContext.Provider value={pokedex}>
      {children}
    </PokemonsContext.Provider>
  );
};

export const usePokedex = () => React.useContext(PokemonsContext);
