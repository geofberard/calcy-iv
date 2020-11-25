import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { PokemonTable } from "./elements/PokemonTable";
import { PokemonProvider } from "../context/PokemonContext";
import { usePokemons } from "../context/PokemonsContext";

const useStyles = makeStyles(theme => ({
  tableContainer: {
    padding: theme.spacing(3),
    height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
  },
}));

export const PokemonListView = () => {
  const classes = useStyles();
  const pokemons = usePokemons();

  return (
    <PokemonProvider>
      <div className={classes.tableContainer}>
        <PokemonTable pokemons={pokemons}/>
      </div>
    </PokemonProvider>
  );
};
