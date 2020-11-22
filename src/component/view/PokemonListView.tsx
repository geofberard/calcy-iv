import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { Pokemon } from "../../data/Pokemon";
import { usePokemons } from "../context/PokemonsContext";

interface ColumnType {
  align: "left" | "center" | "right" | "justify" | "inherit";
  sort: (a: any, b: any) => number;
}

const stringColumn: ColumnType = {
  align: "left",
  sort: (a: string, b: string) => a.localeCompare(b),
};
const numnerColumn: ColumnType = {
  align: "right",
  sort: (a: number, b: number) => a - b,
};

interface ColumnDescription {
  label: string;
  getValue: (pokemon: Pokemon) => React.ReactNode;
  type: ColumnType;
}

const Name: ColumnDescription = {
  label: "Name",
  getValue: pokemon => pokemon.name,
  type: stringColumn,
};
const IV: ColumnDescription = {
  label: "IV",
  getValue: pokemon => pokemon.statIV,
  type: numnerColumn,
};
const CP: ColumnDescription = {
  label: "CP",
  getValue: pokemon => pokemon.cp,
  type: numnerColumn,
};
const HP: ColumnDescription = {
  label: "HP",
  getValue: pokemon => pokemon.hp,
  type: numnerColumn,
};
const Fast: ColumnDescription = {
  label: "Fast",
  getValue: pokemon => pokemon.fastMove,
  type: stringColumn,
};
const Special: ColumnDescription = {
  label: "Special",
  getValue: pokemon => pokemon.specialMove,
  type: stringColumn,
};

const columns: ColumnDescription[] = [Name, IV, CP, HP, Fast, Special];

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

interface SortingRule {
  column: ColumnDescription;
  ascending: boolean;
}

const updateRule = (rule: SortingRule, column: ColumnDescription) => ({
  column,
  ascending: rule && rule.column === column && !rule.ascending,
});

const using = (rule: SortingRule) => (a: Pokemon, b: Pokemon) =>
  !rule ? 0 : rule.column.type.sort(rule.column.getValue(a), rule.column.getValue(b)) *
      (rule.ascending ? 1 : -1);

const isActive = (rule: SortingRule, column: ColumnDescription) =>
  rule && rule.column === column;
  
const getDirection = (rule: SortingRule, column: ColumnDescription) =>
  rule && rule.column === column && rule.ascending ? "asc" : "desc";

export const PokemonListView = () => {
  const classes = useStyles();
  const pokemons = usePokemons();
  const [sortingRule, setSortingRule] = React.useState<SortingRule>();

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
              <TableCell
                align="right"
                className={`${classes.idCell} ${classes.headerCell}`}
              >
                #
              </TableCell>
              {columns.map(column => (
                <TableCell
                  align={column.type.align}
                  className={classes.headerCell}
                  onClick={() =>
                    setSortingRule(updateRule(sortingRule, column))
                  }
                >
                  <TableSortLabel
                    active={isActive(sortingRule, column)}
                    direction={getDirection(sortingRule, column)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {pokemons.sort(using(sortingRule)).map((pokemon, index) => (
              <TableRow>
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
