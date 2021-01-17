import * as React from "react";
import { loadPokemons } from "../../dao/PokemonDao";
import { Pokemon } from "../../data/Pokemon";
import { usePokedexService } from "./usePokedexService";
import { useEventService } from "../context/EventServiceContext";
import { StateContext } from "../context/StateContext";
import { PokemonRaw } from "../../data/PokemonRaw";

const sanitizeName = (name: string) =>
  name
    .replace("Purifié", "")
    .replace("Normale", "")
    .replace("Originelle", "")
    .trim();

const computeId = (pokemon: PokemonRaw) =>
  sanitizeName(pokemon.name) +
  pokemon.statIV +
  pokemon.statAtt +
  pokemon.statDef +
  pokemon.statHP;

export const useCalceIVExport: (
  spreadsheetKey: string,
  sheet: string
) => StateContext<Pokemon[]> = (spreadsheetKey, sheet) => {
  const [pokemons, setPokemons] = React.useState<Pokemon[]>(null);
  const eventServie = useEventService();
  const pokedexService = usePokedexService();

  const loadData = () =>
    loadPokemons(spreadsheetKey, sheet).then(loadedPokemons =>
      setPokemons(
        loadedPokemons
          .filter(rawPokemon => !rawPokemon.ancestor)
          .map(
            rawPokemon =>
              ({
                id: computeId(rawPokemon),
                pokedexRef: rawPokemon.pokedexRed,
                name: sanitizeName(rawPokemon.name),
                nickname: rawPokemon.nickname,
                cp: rawPokemon.cp,
                hp: rawPokemon.hp,
                statIV: rawPokemon.statIV,
                statAtt: rawPokemon.statAtt,
                statDef: rawPokemon.statDef,
                statSta: rawPokemon.statHP,
                level: rawPokemon.level,
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
  }, [spreadsheetKey, sheet]);

  return [pokemons, setPokemons];
};
