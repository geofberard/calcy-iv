import * as React from "react";
import { Pokemon } from "../../data/Pokemon";
import { loadPokemons } from "../../dao/PokemonDao";
import { useConfig } from "./ConfigContext";
import { useEventService } from "./EventServiceContext";

const PokemonsContext = React.createContext<Pokemon[]>([]);

export const PokemonsProvider: React.FC = ({ children }) => {
  const [pokemons, setPokemons] = React.useState<Pokemon[]>([]);
  const [config,] = useConfig();
  const eventServie = useEventService();

  const loadData = () =>
    loadPokemons(
      config.spreadsheetKey,
      config.pokemonSheet
    ).then(loadedPokemons => setPokemons(loadedPokemons));

  React.useEffect(() => {
    loadData();
    return eventServie.subscribe(loadData);
  }, [config]);

  return (
    <PokemonsContext.Provider value={pokemons}>
      {children}
    </PokemonsContext.Provider>
  );
};

export const usePokemons = () => React.useContext(PokemonsContext);
