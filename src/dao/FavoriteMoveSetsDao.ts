import { FavoriteMoveSets } from "../data/pokemon/FavoriteMoveSets";
import { loadFromSpreadSheet } from "./SpreadSheetUtils";

const sanitizeMove = (attack: string) => (attack ? attack.split("\n") : []);

export const loadFavoriteMoveSets = (spreadsheetKey: string, sheetName: string) =>
  new Promise<FavoriteMoveSets[]>((resolve, reject) => {
    if(!sheetName) {
      resolve([]);
      return;
    }
    loadFromSpreadSheet(spreadsheetKey, sheetName)
      .then(driveData => {
        const pokedex: FavoriteMoveSets[] = [];
        for (let i = 0; i < driveData.getNumberOfRows(); i++) {
          pokedex.push({
            name: driveData.getValue(i, 0) as string,
            attackerMoves: {
              fastMoves: sanitizeMove(driveData.getValue(i, 1) as string),
              specialMoves: sanitizeMove(driveData.getValue(i, 2) as string),
            },
            defenderMoves: {
              fastMoves: sanitizeMove(driveData.getValue(i, 3) as string),
              specialMoves: sanitizeMove(driveData.getValue(i, 3) as string),
            }
          });
        }
        resolve(pokedex);
      })
      .catch(reject);
  });
