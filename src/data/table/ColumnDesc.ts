import { usePokemons } from "../../component/context/PokemonsContext";
import { Pokemon } from "../Pokemon";
import { isSame, getOriginal } from "../UpdateUtils";
import { ColumnType, COL_NUMBER, COL_STRING } from "./ColumnType";
import { getMoveLabel } from "../../service/PokemonService";

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
  getValue: pokemon => getMoveLabel(pokemon.fastMove),
  type: COL_STRING,
};

export const Special: ColumnDesc = {
  label: "Special",
  getValue: pokemon => getMoveLabel(pokemon.specialMove),
  type: COL_STRING,
};

export const UpdateStatus: ColumnDesc = {
  label: "Status",
  getValue: pokemon => {
    const [originalPokemons] = usePokemons();
    const original = getOriginal(pokemon, originalPokemons);
    return original ? "Updated" : "New";
  },
  type: COL_STRING,
};

export const POKEMON_COLUMNS: ColumnDesc[] = [Name, IV, CP, HP, Fast, Special];
export const POKEMON_UPDATE_COLUMNS: ColumnDesc[] = [UpdateStatus, Name, IV, CP, HP, Fast, Special];
