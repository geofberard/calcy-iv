import { Checkbox } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import * as React from "react";
import { EditMode } from "../../../data/mode/Modes";
import { ColumnDesc } from "../../../data/table/ColumnDesc";
import { SortingRule } from "../../../data/table/SortingRule";
import { useMode } from "../../context/ModeContext";
import { usePokemons } from "../../context/PokemonsContext";
import { useSelectedPokemons } from "../../context/SelectedPokemonsContext";
import { useSorting } from "../../context/SortingContext";

const updateRule = (rule: SortingRule, column: ColumnDesc) => ({
  column,
  ascending: rule && rule.column === column && !rule.ascending,
});

const isActive = (rule: SortingRule, column: ColumnDesc) =>
  rule && rule.column === column;

const getDirection = (rule: SortingRule, column: ColumnDesc) =>
  rule && rule.column === column && rule.ascending ? "asc" : "desc";

const useStyles = makeStyles(theme => ({
  idCell: {
    width: 10,
  },
  headerCell: {
    fontWeight: "bold",
  },
}));

interface PokemonTableHeaderProps {
  columns: ColumnDesc[],
}

export const PokemonTableHeader = ({columns}:PokemonTableHeaderProps) => {
  const [selectedPokemons, setSelectedPokemons] = useSelectedPokemons();
  const [pokemons] = usePokemons();
  const [isEditEnabled] = useMode(EditMode);
  const classes = useStyles();
  const [sortingRule, setSortingRule] = useSorting();

  const onCheck = () => {
    setSelectedPokemons(
      selectedPokemons.length === 0 ? 
        pokemons.map(currentPokemon => currentPokemon.id) : []
    );
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell
          align="right"
          padding="checkbox"
          className={`${classes.idCell} ${classes.headerCell}`}
        >
          {!isEditEnabled ? (
            "#"
          ) : (
            <Checkbox
              indeterminate={selectedPokemons.length > 0}
              checked={selectedPokemons.length === pokemons.length}
              onChange={onCheck}
            />
          )}
        </TableCell>
        {columns.map(column => (
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
