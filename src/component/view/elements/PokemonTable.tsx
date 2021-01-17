import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import * as React from "react";
import { Pokemon } from "../../../data/Pokemon";
import { ColumnDesc, Fast, Special } from "../../../data/table/ColumnDesc";
import {
  usePokedexService,
  MoveEvaluation,
} from "../../hook/usePokedexService";
import { PokemonRow } from "./PokemonRow";
import { PokemonTableHeader } from "./PokemonTableHeader";
import { usePokemon } from "../../context/PokemonContext";

export const useTableStyles = makeStyles<boolean>(theme => ({
  table: {
    minWidth: 650,
  },
  idCell: {
    width: 10,
  },
}));

export const useCellStyles = makeStyles({
  good: {
    backgroundColor: "#dcedc8",
    "tr:hover &": {
      backgroundColor: "#a5d6a7",
    },
  },
  bad: {
    backgroundColor: "#ffcdd2",
    "tr:hover &": {
      backgroundColor: "#ef9a9a",
    },
  },
  average: {
    backgroundColor: "#ffe0b2",
    "tr:hover &": {
      backgroundColor: "#ffcc80",
    },
  },
});

interface PokemonTableProps {
  pokemons?: Pokemon[];
  columns: ColumnDesc[];
}

export const PokemonTable = ({ pokemons = [], columns }: PokemonTableProps) => {
  const classes = useTableStyles();
  const pokedexService = usePokedexService();
  const cellClasses = useCellStyles();

  const getColStyle = (moveEval: MoveEvaluation) => {
    switch (moveEval) {
      case "Good":
        return cellClasses.good;
      case "Average":
        return cellClasses.average;
      default:
        return cellClasses.bad;
    }
  };
  
  const styleGetter = (pokemon: Pokemon, column: ColumnDesc) => {
    if (pokedexService.getPokedexEntry(pokemon)) {
      if (column === Fast) {
        return getColStyle(
          pokedexService.evaluateMove(pokemon, pokemon.fastMove)
        );
      }
      if (column === Special) {
        return getColStyle(
          pokedexService.evaluateMove(pokemon, pokemon.specialMove)
        );
      }
    }
    return null;
  };

  return (
    <TableContainer component={Paper}>
      <Table
        stickyHeader
        className={classes.table}
        size="small"
        aria-label="a dense table"
      >
        <PokemonTableHeader columns={columns} />
        <TableBody>
          {pokemons.map((pokemon, index) => (
            <PokemonRow index={index} pokemon={pokemon} columns={columns} getCellStyle={styleGetter}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
