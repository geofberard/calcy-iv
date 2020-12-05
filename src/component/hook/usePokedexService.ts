import { Pokemon } from "../../data/Pokemon";
import { PokemonMoveSet } from "../../data/pokemon/PokemonMoveSet";
import { usePokedex } from "../context/PokedexContext";
import { PokemonMove } from "../../data/pokemon/PokemonMove";
import { compareClean } from "../../data/Utils";

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
      
      return (
        pokedexEntry &&
        move &&
        (checkMoveSet(pokedexEntry.attackerMoves, move) ||
          checkMoveSet(pokedexEntry.defenderMoves, move))
      );
    },
    parseMove: (moveName: string) =>
      moves.find(move => compareClean(move.name, moveName)),
  };
};
