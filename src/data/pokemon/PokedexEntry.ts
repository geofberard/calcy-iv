import { Type } from "./Type";
import { PokemonMoveSet } from "./PokemonMoveSet";
import { PokemonMove } from "./PokemonMove";

export interface PokedexEntry {
    index: number;
    name: string;
    types: Type[];
    attackerMoves: PokemonMoveSet;
    defenderMoves: PokemonMoveSet;
  }