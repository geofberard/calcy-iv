import { PokemonMove } from "./pokemon/PokemonMove";
import { PokemonRaw } from "./PokemonRaw";

export interface Pokemon {
  id: string;
  pokedexRef: string;
  name: string;
  nickname: string;
  cp: number;
  hp: number;
  statIV: number;
  statAtt: number;
  statDef: number;
  statSta: number;
  level: number;
  isShiny: boolean;
  fastMove: PokemonMove;
  specialMove: PokemonMove;
  specialMove2: PokemonMove;
  raw: PokemonRaw;
}
