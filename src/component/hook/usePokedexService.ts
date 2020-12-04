import { Pokemon } from "../../data/Pokemon";
import { PokemonMoveSet } from "../../data/pokemon/PokemonMoveSet";
import { usePokedex } from "../context/PokedexContext";

const clean = (value:string) => value.replace(/[^a-zA-Z0-9]+/g, "").toLocaleLowerCase();

const compare = (s1:string, s2:string) => clean(s1) === clean(s2);

const checkMoveSet = (moveSet: PokemonMoveSet, moveName: string) =>
  moveSet.fastMoves.some(current => compare(current.name,moveName)) ||
  moveSet.specialMoves.some(current => compare(current.name,moveName));

export const usePokedexService = () => {
  const [pokedex, moves] = usePokedex();

  return {
    hasGoodMove: (pokemon: Pokemon, moveName: string) => {
      const pokedexEntry = pokedex.find(entry => entry.name === pokemon.name);
      return (
        pokedexEntry &&
        (checkMoveSet(pokedexEntry.attackerMoves, moveName) ||
          checkMoveSet(pokedexEntry.defenderMoves, moveName))
      );
    },
  };
};
