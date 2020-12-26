import * as React from "react";
import { loadPokemons } from "../../dao/PokemonDao";
import { Pokemon } from "../../data/Pokemon";
import { usePokedexService } from "../hook/usePokedexService";
import { useConfig } from "./ConfigContext";
import { useEventService } from "./EventServiceContext";
import { LoadingView } from "../view/LoadingView";
import { PokemonRaw } from "../../data/PokemonRaw";
import { createStateContext } from "./StateContext";

const PokemonsContext = createStateContext<Pokemon[]>();

const sanitizeName = (name: string) =>
  name
    .replace("Purifié", "")
    .replace("Normale", "")
    .replace("Originelle", "")
    .trim();

const computeId = (pokemon: PokemonRaw) =>
  pokemon.name +
  pokemon.statIV +
  pokemon.statAtt +
  pokemon.statDef +
  pokemon.statHP;

export const PokemonsProvider: React.FC = ({ children }) => {
  const [pokemons, setPokemons] = React.useState<Pokemon[]>(null);
  const [config] = useConfig();
  const eventServie = useEventService();
  const pokedexService = usePokedexService();

  const loadData = () =>
    loadPokemons(config.spreadsheetKey, config.pokemonSheet).then(
      loadedPokemons =>
        setPokemons(
          loadedPokemons.map(
            rawPokemon =>
              ({
                id: computeId(rawPokemon),
                pokedexRef: rawPokemon.pokedexRed,
                name: sanitizeName(rawPokemon.name),
                nickname: rawPokemon.nickname,
                cp: rawPokemon.cp,
                hp: rawPokemon.hp,
                statIV: rawPokemon.statIV,
                fastMove: pokedexService.parseMove(rawPokemon.fastMove),
                specialMove: pokedexService.parseMove(rawPokemon.specialMove),
                specialMove2: pokedexService.parseMove(rawPokemon.specialMove2),
                raw: rawPokemon,
              } as Pokemon)
          )
        )
    );

  React.useEffect(() => {
    loadData();
    return eventServie.subscribe(loadData);
  }, [config]);

  return (
    <PokemonsContext.Provider value={[pokemons, setPokemons]}>
      {pokemons ? children : <LoadingView />}
    </PokemonsContext.Provider>
  );
};

export const usePokemons = () => React.useContext(PokemonsContext);
