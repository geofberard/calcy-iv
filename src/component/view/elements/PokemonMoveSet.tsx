import { Typography, makeStyles } from "@material-ui/core";
import * as React from "react";
import { Pokemon } from "../../../data/Pokemon";
import { getMoveLabel } from "../../../service/PokemonService";

interface PokemonMoveSetProps {
  pokemon: Pokemon;
}

const useStyles = makeStyles({
  key: {
    textAlign: "right",
  },
});

export const PokemonMoveSet = ({ pokemon }: PokemonMoveSetProps) => {
  const classes = useStyles();
  return (
    <table>
      <tbody>
        <tr>
          <td className={classes.key}>
            <Typography variant="body2" color="textSecondary">
              Fast
            </Typography>
          </td>
          <td>
            <Typography variant="body1" color="textPrimary">
              {getMoveLabel(pokemon.fastMove)}
            </Typography>
          </td>
        </tr>
        <tr>
          <td className={classes.key}>
            <Typography variant="body2" color="textSecondary">
              Special
            </Typography>
          </td>
          <td>
            <Typography variant="body1" color="textPrimary">
              {getMoveLabel(pokemon.specialMove)}
            </Typography>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
