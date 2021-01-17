import {
  Card,
  CardContent,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import * as React from "react";
import { Pokemon } from "../../../data/Pokemon";
import { getPokemonImage } from "../../../service/PokemonService";
import { usePokedexService } from "../../hook/usePokedexService";
import { PokemonMoveSet } from "./PokemonMoveSet";
import { PokemonStats } from "./PokemonStats";
import { PokemonIdealMoveSets } from "./PokemonIdealMoveSets";

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    maxWidth: 1000,
  },
  image: {
    width: 200,
  },
  flewRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  types: {
    marginBottom: 10,
  },
  advices: {
    paddingLeft: 10,
    minWidth: 400,
  },
}));

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const classes = useStyles();
  const pokedexService = usePokedexService();
  const pokedexEntry = pokedexService.getPokedexEntry(pokemon);

  return (
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.flewRow}>
          <img
            src={getPokemonImage(pokemon)}
            className={classes.image}
            alt="pokemon"
          />
          <div>
            <Typography variant="body2" color="textSecondary">
              #{pokemon.pokedexRef}
            </Typography>
            <Typography variant="h5">{pokemon.nickname}</Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.types}
            >
              {pokedexEntry && pokedexEntry.types.join(" , ")}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
            >
              CP:&nbsp;
              <Typography
                variant="h6"
                color="textPrimary"
                display="inline"
              >
                {pokemon.cp}
              </Typography>
              &nbsp; - HP:&nbsp;
              <Typography
                variant="h6"
                color="textPrimary"
                display="inline"
              >
                {pokemon.hp}
              </Typography>
              &nbsp;(Level: {pokemon.level})
            </Typography>
            <PokemonMoveSet pokemon={pokemon} />
            <PokemonStats pokemon={pokemon} />
          </div>
          {pokedexEntry && (
            <div className={classes.advices}>
              <Typography variant="h6">Recommended</Typography>
              <PokemonIdealMoveSets pokedexEntry={pokedexEntry} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
