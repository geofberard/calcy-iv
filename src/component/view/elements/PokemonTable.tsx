import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import { Pokemon } from "../../../data/Pokemon";
import { SortingRule } from "../../../data/table/SortingRule";
import { usePokemons } from "../../context/PokemonsContext";
import { PokemonTableHeader } from "./PokemonTableHeader";
import { PokemonRow } from "./PokemonRow";

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

interface PokemonTableProps {
  pokemons: Pokemon[];
}

export const PokemonTable = ({pokemons}:PokemonTableProps) => {
  const classes = useStyles();
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
          {pokemons
          .sort(using(sortingRule))
          .map((pokemon, index) => ( <PokemonRow index={index} pokemon={pokemon}/> ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
