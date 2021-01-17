import { Typography, makeStyles } from "@material-ui/core";
import * as React from "react";
import { PokedexEntry } from "../../../data/pokemon/PokedexEntry";
import { getMoveLabel } from "../../../service/PokemonService";

interface PokemonIdealMoveSetsProps {
  pokedexEntry: PokedexEntry;
}

const useStyles = makeStyles({
  cell: {
    verticalAlign: "top",
  },
});

export const PokemonIdealMoveSets = ({
  pokedexEntry,
}: PokemonIdealMoveSetsProps) => {
  const classes = useStyles();
  return (
    <table>
      <tbody>
        <tr>
          <td/>
          <td className={classes.cell}>
            <Typography variant="body2" color="textSecondary">
              Attacker
            </Typography>
          </td>
          <td className={classes.cell}>
            <Typography variant="body2" color="textSecondary">
              Defender
            </Typography>
          </td>
        </tr>
        <tr>
          <td className={classes.cell} align="right">
            <Typography variant="body2" color="textSecondary">
              Fast
            </Typography>
          </td>
          <td className={classes.cell}>
            <Typography variant="body1" color="textPrimary">
              {pokedexEntry.attackerMoves.fastMoves
                .map(getMoveLabel)
                .map(move => (
                  <div>{move}</div>
                ))}
            </Typography>
          </td>
          <td className={classes.cell}>
            <Typography variant="body1" color="textPrimary">
              {pokedexEntry.defenderMoves.fastMoves
                .map(getMoveLabel)
                .map(move => (
                  <div>{move}</div>
                ))}
            </Typography>
          </td>
        </tr>
        <tr>
          <td className={classes.cell}>
            <Typography variant="body2" color="textSecondary" align="right">
              Special
            </Typography>
          </td>
          <td className={classes.cell}>
            <Typography variant="body1" color="textPrimary">
              {pokedexEntry.attackerMoves.specialMoves
                .map(getMoveLabel)
                .map(move => (
                  <div>{move}</div>
                ))}
            </Typography>
          </td>
          <td className={classes.cell}>
            <Typography variant="body1" color="textPrimary">
              {pokedexEntry.defenderMoves.specialMoves
                .map(getMoveLabel)
                .map(move => (
                  <div>{move}</div>
                ))}
            </Typography>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
