import { Type } from "./Type";
import { PokemonMoveSet } from "./PokemonMoveSet";

export interface PokedexEntry {
    index: number;
    img:string;
    name: string;
    types: Type[];
    attackerMoves: PokemonMoveSet;
    defenderMoves: PokemonMoveSet;
  }