import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { ColumnDesc, POKEMON_COLUMNS } from "../../../data/table/ColumnDesc";
import { SortingRule } from "../../../data/table/SortingRule";


const updateRule = (rule: SortingRule, column: ColumnDesc) => ({
  column,
  ascending: rule && rule.column === column && !rule.ascending,
});

const isActive = (rule: SortingRule, column: ColumnDesc) =>
rule && rule.column === column;

const getDirection = (rule: SortingRule, column: ColumnDesc) =>
rule && rule.column === column && rule.ascending ? "asc" : "desc";

interface PokemonTableHeaderProps {
  sortingRule: SortingRule;
  setSortingRule: (rule: SortingRule) => void;
}

const useStyles = makeStyles(theme => ({
  idCell: {
    width: 10,
  },
  headerCell: {
    fontWeight: "bold",
  },
}));

export const PokemonTableHeader = ({
  sortingRule,
  setSortingRule,
}: PokemonTableHeaderProps) => {
  const classes = useStyles();

  return (
    <TableHead>
      <TableRow>
        <TableCell
          align="right"
          className={`${classes.idCell} ${classes.headerCell}`}
        >
          #
        </TableCell>
        {POKEMON_COLUMNS.map(column => (
          <TableCell
            align={column.type.align}
            className={classes.headerCell}
            onClick={() => setSortingRule(updateRule(sortingRule, column))}
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
  );
};
