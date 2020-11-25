import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import { Pokemon } from "../../../data/Pokemon";
import { POKEMON_COLUMNS } from "../../../data/table/ColumnDesc";
import { SortingRule } from "../../../data/table/SortingRule";
import { usePokemons } from "../../context/PokemonsContext";
import { PokemonTableHeader } from "./PokemonTableHeader";

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    height: "100%",
  },
  idCell: {
    width: 10,
  },
}));

const using = (rule: SortingRule) => (a: Pokemon, b: Pokemon) =>
  !rule ? 0 : rule.column.type.sort(rule.column.getValue(a), rule.column.getValue(b)) *
      (rule.ascending ? 1 : -1);

export const PokemonTable = () => {
  const classes = useStyles();
  const pokemons = usePokemons();
  const [sortingRule, setSortingRule] = React.useState<SortingRule>();

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table
        stickyHeader
        className={classes.table}
        size="small"
        aria-label="a dense table"
      >
        <PokemonTableHeader
          sortingRule={sortingRule}
          setSortingRule={setSortingRule}
        />
        <TableBody>
          {pokemons.sort(using(sortingRule)).map((pokemon, index) => (
            <TableRow>
              <TableCell align="right" className={classes.idCell}>
                {index + 1}
              </TableCell>
              {POKEMON_COLUMNS.map(column => (
                <TableCell align={column.type.align}>
                  {column.getValue(pokemon)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
