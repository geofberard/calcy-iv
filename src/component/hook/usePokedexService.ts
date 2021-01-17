import { Pokemon } from "../../data/Pokemon";
import { PokemonMoveSet } from "../../data/pokemon/PokemonMoveSet";
import { usePokedex } from "../context/PokedexContext";
import { PokemonMove } from "../../data/pokemon/PokemonMove";
import { compareClean } from "../../data/Utils";

const checkMoveSet = (moveSet: PokemonMoveSet, move: PokemonMove) =>
  moveSet.fastMoves.some(current => current.id === move.id) ||
  moveSet.specialMoves.some(current => current.id === move.id);

export type MoveEvaluation = "Good" | "Average" | "Bad";

export const usePokedexService = () => {
  const [pokedex, moves] = usePokedex();

  return {
    getPokedexEntry: (pokemon: Pokemon) =>
      pokedex.find(entry => entry.name === pokemon.name),
    evaluateMove: (pokemon: Pokemon, move: PokemonMove) => {
      const pokedexEntry = pokedex.find(entry => entry.name === pokemon.name);
      if (
        pokedexEntry &&
        move &&
        (checkMoveSet(pokedexEntry.attackerMoves, move) ||
          checkMoveSet(pokedexEntry.defenderMoves, move))
      ) {
        return "Good";
      }
      if (move && pokedexEntry.types.includes(move.type)) {
        return "Average";
      }
      return "Bad";
    },
    parseMove: (moveName: string) =>
      moves.find(move => compareClean(move.name, moveName)),
  };
};
