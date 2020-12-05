export interface FavoriteMoveSets {
  name: string,
  attackerMoves: {
    fastMoves: string[],
    specialMoves: string[],
  }
  defenderMoves: {
    fastMoves: string[],
    specialMoves: string[],
  }
}
