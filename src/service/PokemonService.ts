import { Pokemon } from "../data/Pokemon";
import { PokemonMove } from "../data/pokemon/PokemonMove";

const toUsDate = (date: Date) => {
  if (!date) {
    return "";
  }

  const YYYY = date.getFullYear();
  const MM = (date.getMonth() + 1).toString().padStart(2, "0");
  const dd = date.getDate().toString().padStart(2, "0");
  const hh = date.getHours().toString().padStart(2, "0");
  const mm = date.getMinutes().toString().padStart(2, "0");
  const ss = date.getSeconds().toString().padStart(2, "0");
  return `${MM}/${dd}/${YYYY} ${hh}:${mm}:${ss}`;
};

const toString = (value: any) =>
  value instanceof Date ? toUsDate(value) : value;

export const serializePokemons = (pokemons: Pokemon[]) => {
  const header = Object.keys(pokemons[0] ? pokemons[0].raw : []).join("\t");
  const content = pokemons
    .map(pokemon => pokemon.raw)
    .map(rawPokemon => Object.values(rawPokemon).map(toString).join("\t"))
    .join("\n");
  return `${header}\n${content}`;
};

export const getPokemonImage = (pokemon: Pokemon) => {
  const pokedexref = pokemon.pokedexRef.toString().padStart(3, "0");
  const suffix = pokemon.name.endsWith("Alola") ? "61" : "00";
  const suffix2 = pokemon.isShiny ? "-shiny" : "";
  return `https://images.gameinfo.io/pokemon/256/${pokedexref}-${suffix}${suffix2}.webp`;
};

export const getMoveLabel = (move: PokemonMove) => (move ? move.name : "-");
