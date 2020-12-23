import { makeStyles } from "@material-ui/core/styles";
import * as React from "react";
import { PokemonProvider } from "../context/PokemonContext";
import { usePokemons } from "../context/PokemonsContext";
import { SelectedPokemonsProvider } from "../context/SelectedPokemonsContext";
import { PokemonTable } from "./elements/PokemonTable";
import { PokemonTableToolbar } from "./elements/PokemonTableToolbar";

const useStyles = makeStyles(theme => ({
  tableContainer: {
    height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
  },
}));

export const PokemonListView = () => {
  const classes = useStyles();
  const [pokemons] = usePokemons();

  return (
    <>
      <div className={classes.tableContainer}>
        <PokemonProvider>
          <SelectedPokemonsProvider>
            <PokemonTableToolbar />
            <PokemonTable pokemons={pokemons} />
          </SelectedPokemonsProvider>
        </PokemonProvider>
      </div>
    </>
  );
};
