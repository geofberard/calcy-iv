import { loadFromSpreadSheet } from "./SpreadSheetUtils";
import { PokemonRaw } from "../data/PokemonRaw";

export const loadPokemons = (spreadsheetKey: string, sheetName: string) =>
  new Promise<PokemonRaw[]>((resolve, reject) => {
    loadFromSpreadSheet(spreadsheetKey, sheetName)
      .then(driveData => {
        const pokemons: PokemonRaw[] = [];
        for (let i = 0; i < driveData.getNumberOfRows(); i++) {
          pokemons.push({
            ancestor: (driveData.getValue(i, 0) === 1) as boolean,
            scanDate: driveData.getValue(i, 1) as Date,
            pokedexRed: driveData.getValue(i, 2) as string,
            name: driveData.getValue(i, 3) as string,
            nickname: driveData.getValue(i, 4) as string,
            gender: driveData.getValue(i, 5) as string,
            level: driveData.getValue(i, 6) as number,
            possibleLevels: driveData.getValue(i, 7) as number,
            cp: driveData.getValue(i, 8) as number,
            hp: driveData.getValue(i, 9) as number,
            powerUpDustCost: driveData.getValue(i, 10) as number,
            statMinIV: driveData.getValue(i, 11) as number,
            statIV: driveData.getValue(i, 12) as number,
            statMaxIV: driveData.getValue(i, 13) as number,
            statAtt: driveData.getValue(i, 14) as number,
            statDef: driveData.getValue(i, 15) as number,
            statHP: driveData.getValue(i, 16) as number,
            unique: (driveData.getValue(i, 17) === 1) as boolean,
            fastMove: driveData.getValue(i, 18) as string,
            specialMove: driveData.getValue(i, 19) as string,
            specialMove2: driveData.getValue(i, 20) as string,
            dps: driveData.getValue(i, 21) as number,
            box: driveData.getValue(i, 22) as string,
            custom1: driveData.getValue(i, 23) as string,
            custom2: driveData.getValue(i, 24) as string,
            saved: driveData.getValue(i, 25) as number,
            form: driveData.getValue(i, 26) as number,
            isFromEgg: (driveData.getValue(i, 27) === 1) as boolean,
            isLucky: (driveData.getValue(i, 28) === 1) as boolean,
            isBuddyBoosted: (driveData.getValue(i, 29) === 1) as boolean,
            isPurified: (driveData.getValue(i, 30) === 4) as boolean,
            height: driveData.getValue(i, 31) as number,
            catchDate: driveData.getValue(i, 32) as string,
          });
        }
        resolve(pokemons);
      })
      .catch(reject);
  });
