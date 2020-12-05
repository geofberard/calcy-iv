import { Pokemon } from "../../data/Pokemon";
import { PokemonMoveSet } from "../../data/pokemon/PokemonMoveSet";
import { usePokedex } from "../context/PokedexContext";
import { PokemonMove } from "../../data/pokemon/PokemonMove";

const clean = (value: string) =>
  value
    .replace(/s$/, "")
    .replace(/s /, " ")
    .replace(/[^a-zA-Z0-9]+/g, "")
    .toLocaleLowerCase();

const compare = (s1: string, s2: string) => clean(s1) === clean(s2);

const checkMoveSet = (moveSet: PokemonMoveSet, move: PokemonMove) =>
  moveSet.fastMoves.some(current => current.id === move.id) ||
  moveSet.specialMoves.some(current => current.id === move.id);

export const usePokedexService = () => {
  const [pokedex, moves] = usePokedex();

  return {
    getPokedexEntry: (pokemon: Pokemon) =>
      pokedex.find(entry => entry.name === pokemon.name),
    hasGoodMove: (pokemon: Pokemon, move: PokemonMove) => {
      const pokedexEntry = pokedex.find(entry => entry.name === pokemon.name);
      console.log(pokemon, move);
      return (
        pokedexEntry &&
        move &&
        (checkMoveSet(pokedexEntry.attackerMoves, move) ||
          checkMoveSet(pokedexEntry.defenderMoves, move))
      );
    },
    parseMove: (moveName: string) => {
      console.log(moveName);
      return moves.find(move => compare(move.name, moveName));
    },
  };
};
