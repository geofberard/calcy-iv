import { loadFromSpreadSheet } from "./SpreadSheetUtils";
import { PokedexEntry } from "../data/PokedexEntry";

const sanitizeAttack = (attack: string) => (attack ? attack.split("\n") : []);

export const loadPokedex = (spreadsheetKey: string, sheetName: string) =>
  new Promise<PokedexEntry[]>((resolve, reject) => {
    loadFromSpreadSheet(spreadsheetKey, sheetName)
      .then(driveData => {
        const pokedex: PokedexEntry[] = [];
        for (let i = 0; i < driveData.getNumberOfRows(); i++) {
          pokedex.push({
            name: driveData.getValue(i, 0) as string,
            attack: {
              fastMoves: sanitizeAttack(driveData.getValue(i, 3) as string),
              specialMoves: sanitizeAttack(driveData.getValue(i, 4) as string),
            },
            defense: {
              fastMoves: sanitizeAttack(driveData.getValue(i, 5) as string),
              specialMoves: sanitizeAttack(driveData.getValue(i, 6) as string),
            },
          });
        }
        resolve(pokedex);
      })
      .catch(reject);
  });
