import { Grid } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import * as React from "react";
import { usePokemons } from "../context/PokemonsContext";
import { PokemonGridItem } from "./elements/PokemonGridItem";

const useStyles = makeStyles((theme: Theme) => ({
  tableContainer: {
    height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
    display: "flex",
    flexDirection: "column",
  },
  grid: {
    margin: "0 auto",
    maxWidth: 500,
  },
}));

export const PokemonGridView = () => {
  const classes = useStyles();
  const [pokemons] = usePokemons();

  return (
    <div className={classes.tableContainer}>
      <Grid container justify="center" spacing={6} className={classes.grid}>
        {pokemons.map(pokemon => (
          <PokemonGridItem pokemon={pokemon} />
        ))}
      </Grid>
    </div>
  );
};
