import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Pokemon } from "../../data/Pokemon";
import { usePokemons } from "../context/PokemonsContext";

interface ColumnType {
  align: "left" | "center" | "right" | "justify" | "inherit";
}

const stringColumn: ColumnType = { align: "left" };
const numnerColumn: ColumnType = { align: "right" };

interface ColumnDescription {
  label: string;
  getValue: (pokemon: Pokemon) => React.ReactNode;
  type: ColumnType;
}

const columns: ColumnDescription[] = [
  { label: "Name", getValue: pokemon => pokemon.name, type: stringColumn },
  { label: "IV", getValue: pokemon => pokemon.statIV, type: numnerColumn },
  { label: "CP", getValue: pokemon => pokemon.cp, type: numnerColumn },
  { label: "HP", getValue: pokemon => pokemon.hp, type: numnerColumn },
  { label: "Fast", getValue: pokemon => pokemon.fastMove, type: stringColumn },
  {
    label: "Special",
    getValue: pokemon => pokemon.specialMove,
    type: stringColumn,
  },
];

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  tableWrapper: {
    padding: theme.spacing(3),
    height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
  },
  tableContainer: {
    height: "100%",
  },
  idCell: {
    width: 10,
  },
  headerCell: {
    fontWeight: "bold",
  },
}));

export const PokemonListView = () => {
  const classes = useStyles();
  const pokemons = usePokemons();

  return (
    <div className={classes.tableWrapper}>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table
          stickyHeader
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="right" className={`${classes.idCell} ${classes.headerCell}`}>
                #
              </TableCell>
              {columns.map(column => (
                <TableCell align={column.type.align} className={classes.headerCell}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {pokemons.map((pokemon, index) => (
              <TableRow key={pokemon.id}>
                <TableCell align="right" className={classes.idCell}>
                  {index + 1}
                </TableCell>
                {columns.map(column => (
                  <TableCell align={column.type.align}>
                    {column.getValue(pokemon)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
