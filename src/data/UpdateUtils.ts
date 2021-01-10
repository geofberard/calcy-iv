import { Pokemon } from "./Pokemon";

export const isSame = (pokemon1: Pokemon, pokemon2: Pokemon) =>
  pokemon1.id === pokemon2.id;

export const isNotBetter = (pokemon1: Pokemon, pokemon2: Pokemon) =>
  pokemon1.hp <= pokemon2.hp || pokemon1.cp <= pokemon2.cp;

export const alreadyPresent = (pokemons: Pokemon[]) => (newPokemon: Pokemon) =>
  !pokemons.some(
    pokemon => isSame(newPokemon, pokemon) && isNotBetter(newPokemon, pokemon)
  );

export const bestFirst = (pokemon1: Pokemon, pokemon2: Pokemon) =>
  pokemon2.cp - pokemon1.cp;

export const duplicates = (pokemon: Pokemon, pos: number, self: Pokemon[]) =>
  self.findIndex(current => current.id === pokemon.id) === pos;