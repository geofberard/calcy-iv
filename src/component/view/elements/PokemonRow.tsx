import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Pokemon } from "../../../data/Pokemon";
import { POKEMON_COLUMNS } from "../../../data/table/ColumnDesc";
import { usePokemon } from "../../context/PokemonContext";
import { useStyleGetter } from "../../context/TableStyleGetterContext";
import { useTableStyles } from "./PokemonTable";

interface PokemonTableProps {
  index: number;
  pokemon: Pokemon;
}

export const PokemonRow = ({ index, pokemon }: PokemonTableProps) => {
  const classes = useTableStyles();
  const [currentPokemon, setCurrentPokemon] = usePokemon();
  const getStyles = useStyleGetter();

  return (
    <TableRow
      className={pokemon === currentPokemon ? classes.focused : null}
      onMouseOver={() => setCurrentPokemon(pokemon)}
      onFocus={() => setCurrentPokemon(pokemon)}
    >
      <TableCell align="right" className={classes.idCell}>
        {index + 1}
      </TableCell>
      {POKEMON_COLUMNS.map(column => (
        <TableCell align={column.type.align} className={getStyles(pokemon, column)}>
          {column.getValue(pokemon)}
        </TableCell>
      ))}
    </TableRow>
  );
};
