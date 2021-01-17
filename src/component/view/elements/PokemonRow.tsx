import { Checkbox, makeStyles, Theme } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import * as React from "react";
import { EditMode } from "../../../data/mode/Modes";
import { Pokemon } from "../../../data/Pokemon";
import { ColumnDesc } from "../../../data/table/ColumnDesc";
import { useMode } from "../../context/ModeContext";
import { usePokemon } from "../../context/PokemonContext";
import { useInSelectedPokemon } from "../../context/SelectedPokemonsContext";

const useStyles = makeStyles((theme: Theme) => ({
  row: {
    "&:hover": {
      backgroundColor: theme.palette.grey["100"],
    },
  },
  idCell: {
    width: 10,
  },
  checkBox: {
    padding: 0,
  },
}));

interface PokemonTableProps {
  index: number;
  pokemon: Pokemon;
  columns: ColumnDesc[];
  getCellStyle: (pokemon: Pokemon, column: ColumnDesc) => string;
}

export const PokemonRow = ({
  index,
  pokemon,
  columns,
  getCellStyle,
}: PokemonTableProps) => {
  const classes = useStyles();
  const [currentPokemon, setCurrentPokemon] = usePokemon();
  const [isSelected, setSelected] = useInSelectedPokemon(pokemon);
  const [isEditEnabled] = useMode(EditMode);

  const isHighlighted =
    pokemon === currentPokemon || (isEditEnabled && isSelected);

  const onClick = () => {
    if (isEditEnabled) {
      setSelected(!isSelected);
    }
  };

  return (
    <TableRow
      className={classes.row}
      onMouseEnter={() => setCurrentPokemon(pokemon)}
      onMouseLeave={() => setCurrentPokemon(undefined)}
      onFocus={() => setCurrentPokemon(pokemon)}
      onClick={onClick}
    >
      <TableCell align="right" className={classes.idCell} padding="checkbox">
        {!isEditEnabled ? (
          index + 1
        ) : (
          <Checkbox checked={isSelected}/>
        )}
      </TableCell>
      {columns.map(column => (
        <TableCell
          align={column.type.align}
          className={getCellStyle(pokemon, column)}
        >
          {column.getValue(pokemon)}
        </TableCell>
      ))}
    </TableRow>
  );
};
