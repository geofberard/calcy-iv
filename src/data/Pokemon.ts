import { PokemonMove } from "./pokemon/PokemonMove";

export interface Pokemon {
  id: string;
  name: string;
  nickname: string;
  cp: number;
  hp: number;
  statIV: number;
  fastMove: PokemonMove;
  specialMove: PokemonMove;
  specialMove2: PokemonMove;
}
