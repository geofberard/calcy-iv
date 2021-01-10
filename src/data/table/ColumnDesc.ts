import { Pokemon } from "../Pokemon";
import { ColumnType, COL_NUMBER, COL_STRING } from "./ColumnType";
import { usePokemons } from "../../component/context/PokemonsContext";
import { alreadyPresent, isSame } from "../UpdateUtils";

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
  getValue: pokemon => pokemon.statIV,
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
  getValue: pokemon => (pokemon.fastMove ? pokemon.fastMove.name : "-"),
  type: COL_STRING,
};

export const Special: ColumnDesc = {
  label: "Special",
  getValue: pokemon => (pokemon.specialMove ? pokemon.specialMove.name : "-"),
  type: COL_STRING,
};

export const UpdateStatus: ColumnDesc = {
  label: "Status",
  getValue: pokemon => {
    const [pokemons] = usePokemons();
    const isUpdated = pokemons.some( current => isSame(current, pokemon) )
    return isUpdated ? "Updated" : "New";
  },
  type: COL_STRING,
};

export const POKEMON_COLUMNS: ColumnDesc[] = [Name, IV, CP, HP, Fast, Special];
export const POKEMON_UPDATE_COLUMNS: ColumnDesc[] = [UpdateStatus, Name, IV, CP, HP, Fast, Special];
