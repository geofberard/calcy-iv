import { Checkbox, makeStyles, Theme } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import * as React from "react";
import { EditMode } from "../../../data/mode/Modes";
import { Pokemon } from "../../../data/Pokemon";
import { POKEMON_COLUMNS } from "../../../data/table/ColumnDesc";
import { useMode } from "../../context/ModeContext";
import { usePokemon } from "../../context/PokemonContext";
import { useInSelectedPokemon } from "../../context/SelectedPokemonsContext";
import { useStyleGetter } from "../../context/TableStyleGetterContext";
import { useTableStyles } from "./PokemonTable";

const useStyles = makeStyles((theme: Theme) => ({
  highlighted: {
    backgroundColor: theme.palette.grey["100"],
    "& $green": {
      backgroundColor: theme.palette.success.main,
    },
    "& $red": {
      backgroundColor: theme.palette.error.main,
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
}

export const PokemonRow = ({ index, pokemon }: PokemonTableProps) => {
  const classes = useStyles();
  const [currentPokemon, setCurrentPokemon] = usePokemon();
  const [isSelected, setSelected] = useInSelectedPokemon(pokemon);
  const [isEditEnabled] = useMode(EditMode);
  const getStyles = useStyleGetter();

  const isHighlighted =
    pokemon === currentPokemon || (isEditEnabled && isSelected);

  const onClick = () => {
    if (isEditEnabled) {
      setSelected(!isSelected);
    }
  };

  return (
    <TableRow
      className={isHighlighted ? classes.highlighted : null}
      onMouseOver={() => setCurrentPokemon(pokemon)}
      onFocus={() => setCurrentPokemon(pokemon)}
      onClick={onClick}
    >
      <TableCell align="right" className={classes.idCell} padding="checkbox">
        {!isEditEnabled ? index + 1 : <Checkbox checked={isSelected} className={classes.highlighted}/>}
      </TableCell>
      {POKEMON_COLUMNS.map(column => (
        <TableCell
          align={column.type.align}
          className={getStyles(pokemon, column)}
        >
          {column.getValue(pokemon)}
        </TableCell>
      ))}
    </TableRow>
  );
};
