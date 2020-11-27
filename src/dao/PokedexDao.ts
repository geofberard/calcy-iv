import { loadFromSpreadSheet } from "./SpreadSheetUtils";
import { PokedexEntry } from "../data/PokedexEntry";

const sanitizeMove = (attack: string) => (attack ? attack.split("\n") : []);

export const loadPokedex = (spreadsheetKey: string, sheetName: string) =>
  new Promise<PokedexEntry[]>((resolve, reject) => {
    loadFromSpreadSheet(spreadsheetKey, sheetName)
      .then(driveData => {
        const pokedex: PokedexEntry[] = [];
        for (let i = 0; i < driveData.getNumberOfRows(); i++) {
          pokedex.push({
            name: driveData.getValue(i, 0) as string,
            fastMoves: sanitizeMove(driveData.getValue(i, 1) as string),
            specialMoves: sanitizeMove(driveData.getValue(i, 2) as string),
          });
        }
        resolve(pokedex);
      })
      .catch(reject);
  });
