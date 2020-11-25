import { loadFromSpreadSheet } from "./SpreadSheetUtils";
import { PokedexEntry } from "../data/PokedexEntry";

export const loadPokedex = () =>
  new Promise<PokedexEntry[]>((resolve, reject) => {
    loadFromSpreadSheet(
      "1ftOH6puWKaWCpcVzTb-1h_tVUcbji-WO6vQizNUmSuo",
      "Pokedex"
    )
      .then(driveData => {
        const pokedex: PokedexEntry[] = [];
        for (let i = 0; i < driveData.getNumberOfRows(); i++) {
          pokedex.push({
            name: driveData.getValue(i, 0) as string,
            attack:{
              fastMoves: [...(driveData.getValue(i, 3) as string).split("\n")],
              specialMoves: [...(driveData.getValue(i, 4) as string).split("\n")],
            },
            defense:{
              fastMoves: [...(driveData.getValue(i, 3) as string).split("\n")],
              specialMoves: [...(driveData.getValue(i, 4) as string).split("\n")],
            }
          });
        }
        resolve(pokedex);
      })
      .catch(reject);
  });
