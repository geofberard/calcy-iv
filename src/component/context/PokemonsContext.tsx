import * as React from "react";
import { loadPokemons } from "../../dao/PokemonDao";
import { Pokemon } from "../../data/Pokemon";
import { usePokedexService } from "../hook/usePokedexService";
import { useConfig } from "./ConfigContext";
import { useEventService } from "./EventServiceContext";
import { LoadingView } from "../view/LoadingView";

const PokemonsContext = React.createContext<Pokemon[]>([]);

const sanitizeName = (name: string) =>
  name.replace("Purifié", "").replace("Normale", "").replace("Originelle", "").trim();

export const PokemonsProvider: React.FC = ({ children }) => {
  const [pokemons, setPokemons] = React.useState<Pokemon[]>([]);
  const [config] = useConfig();
  const eventServie = useEventService();
  const pokedexService = usePokedexService();

  const loadData = () =>
    loadPokemons(
      config.spreadsheetKey,
      config.pokemonSheet
    ).then(loadedPokemons =>
      setPokemons(
        loadedPokemons.map(
          rawPokemon =>
            ({
              id: rawPokemon.name,
              name: sanitizeName(rawPokemon.name),
              cp: rawPokemon.cp,
              hp: rawPokemon.hp,
              statIV: rawPokemon.statIV,
              fastMove: pokedexService.parseMove(rawPokemon.fastMove),
              specialMove: pokedexService.parseMove(rawPokemon.specialMove),
              specialMove2: pokedexService.parseMove(rawPokemon.specialMove2),
            } as Pokemon)
        )
      )
    );

  React.useEffect(() => {
    loadData();
    return eventServie.subscribe(loadData);
  }, [config]);

  return (
    <PokemonsContext.Provider value={pokemons}>
      {pokemons.length !== 0 ? children :<LoadingView /> }
    </PokemonsContext.Provider>
  );
};

export const usePokemons = () => React.useContext(PokemonsContext);
