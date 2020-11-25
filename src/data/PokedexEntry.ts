export interface PokedexEntry {
  name: string,
  attack: PokedexAttack,
  defense: PokedexAttack,
}

export interface PokedexAttack {
  fastMoves: string[],
  specialMoves: string[],
}
