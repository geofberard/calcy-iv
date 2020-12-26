import { Type } from "./Type";
import { PokemonMoveSet } from "./PokemonMoveSet";

export interface PokedexEntry {
    index: number;
    name: string;
    types: Type[];
    attackerMoves: PokemonMoveSet;
    defenderMoves: PokemonMoveSet;
  }