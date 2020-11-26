import { Pokemon } from "../Pokemon";
import { ColumnType, COL_NUMBER, COL_STRING } from "./ColumnType";

export interface ColumnDesc {
  label: string;
  getValue: (pokemon: Pokemon) => React.ReactNode;
  type: ColumnType;
}

export const Name: ColumnDesc = {
  label: "Name",
  getValue: pokemon => pokemon.name,
  type: COL_STRING,
};

export const IV: ColumnDesc = {
  label: "IV",
  getValue: pokemon => pokemon.name,
  type: COL_NUMBER,
};

export const CP: ColumnDesc = {
  label: "CP",
  getValue: pokemon => pokemon.cp,
  type: COL_NUMBER,
};

export const HP: ColumnDesc = {
  label: "HP",
  getValue: pokemon => pokemon.hp,
  type: COL_NUMBER,
};

export const Fast: ColumnDesc = {
  label: "Fast",
  getValue: pokemon => pokemon.fastMove,
  type: COL_STRING,
};

export const Special: ColumnDesc = {
  label: "Special",
  getValue: pokemon => pokemon.specialMove,
  type: COL_STRING,
};

export const POKEMON_COLUMNS: ColumnDesc[] = [Name, IV, CP, HP, Fast, Special];
