import { Pokemon } from "./Pokemon";
import { PokemonMove } from "./pokemon/PokemonMove";

export const isSame = (pokemon1: Pokemon, pokemon2: Pokemon) =>
  pokemon1.id === pokemon2.id;

const compareMoves = (move1: PokemonMove, move2: PokemonMove) =>
  move1 && move2 && move1.id !== move2.id;

export const hasChanged = (pokemon1: Pokemon, pokemon2: Pokemon) =>
  pokemon1.hp > pokemon2.hp ||
  pokemon1.cp > pokemon2.cp ||
  compareMoves(pokemon1.fastMove, pokemon2.fastMove) ||
  compareMoves(pokemon1.specialMove, pokemon2.specialMove);

export const hasChange = (pokemons: Pokemon[], newPokemon: Pokemon) =>
  pokemons.some(
    pokemon => isSame(newPokemon, pokemon) && hasChanged(newPokemon, pokemon)
  );



export const notInUnion = (pokemons: Pokemon[]) => (newPokemon: Pokemon) =>
  !pokemons.some(pokemon => isSame(newPokemon, pokemon));

export const newOrChanged = (pokemons: Pokemon[]) => {
  const latestUpdate = Math.max(
    ...pokemons.map(pokemon => pokemon.raw.scanDate.getTime())
  );

  const isNew = notInUnion(pokemons);

  return (newPokemon: Pokemon) => (newPokemon.raw.scanDate.getTime() >= latestUpdate && isNew(newPokemon)) ||
    hasChange(pokemons, newPokemon);
};
  
export const bestFirst = (pokemon1: Pokemon, pokemon2: Pokemon) =>
  pokemon2.cp - pokemon1.cp;

export const duplicates = (pokemon: Pokemon, pos: number, self: Pokemon[]) =>
  self.findIndex(current => current.id === pokemon.id) === pos;

export const getOriginal = (pokemon: Pokemon, pokemons: Pokemon[]) => 
  pokemons.find( current => isSame(current, pokemon) );
