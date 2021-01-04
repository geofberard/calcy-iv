import { makeStyles } from "@material-ui/core/styles";
import * as React from "react";
import { useSelectedPokemons } from "../context/SelectedPokemonsContext";
import { useProcessedProkemons } from "../hook/useProcessedPokemons";
import { PokemonSelectionToolbar } from "./elements/PokemonSelectionToolbar";
import { PokemonTable } from "./elements/PokemonTable";
import { usePokemons } from "../context/PokemonsContext";

const useStyles = makeStyles(theme => ({
  tableContainer: {
    height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
    display: "flex",
    flexDirection: "column",
  },
  root: {
    height: 180,
  },
  container: {
    display: "flex",
  },
  paper: {
    margin: theme.spacing(1),
  },
  svg: {
    width: 100,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
}));

export const PokemonListView = () => {
  const classes = useStyles();
  const pokemons = useProcessedProkemons();
  const [, setPokemons] = usePokemons();
  const [selectedPokemons, setSelectedPokemons] = useSelectedPokemons();

  const deleteSelected = () => {
    setPokemons(
      pokemons.filter(pokemon => !selectedPokemons.includes(pokemon.id))
    );
    setSelectedPokemons([]);
  };

  return (
    <div className={classes.tableContainer}>
      <div>
        <PokemonSelectionToolbar onDelete={deleteSelected} />
      </div>
      <PokemonTable pokemons={pokemons} />
    </div>
  );
};
