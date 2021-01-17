import { makeStyles, Theme } from "@material-ui/core/styles";
import * as React from "react";
import { DetailsMode } from "../../data/mode/Modes";
import { POKEMON_COLUMNS } from "../../data/table/ColumnDesc";
import { useMode } from "../context/ModeContext";
import { usePokemons } from "../context/PokemonsContext";
import { useSelectedPokemons } from "../context/SelectedPokemonsContext";
import { useProcessedProkemons } from "../hook/useProcessedPokemons";
import { PokemonDetailsBar } from "./elements/PokemonDetailsBar";
import { PokemonSelectionToolbar } from "./elements/PokemonSelectionToolbar";
import { PokemonTable } from "./elements/PokemonTable";

const getHeight = (isDetailsEnabled: boolean, theme: Theme) =>
  `calc(${isDetailsEnabled ? 70 : 100}vh - ${
    theme.mixins.toolbar.minHeight
  }px)`;

const useStyles = makeStyles<Theme, boolean>(theme => ({
  tableContainer: {
    height: isDetailsEnabled => getHeight(!isDetailsEnabled, theme),
    display: "flex",
    flexDirection: "column",
    transition: theme.transitions.create(["height", "transform"], {
      duration: theme.transitions.duration.standard,
    }),
  },
  details: {
    height: "30vh",
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
  const [pokemons, setPokemons] = usePokemons();
  const processedPokemons = useProcessedProkemons(pokemons);
  const [selectedPokemons, setSelectedPokemons] = useSelectedPokemons();
  const [isDetailsEnabled] = useMode(DetailsMode);
  const classes = useStyles(isDetailsEnabled);

  const deleteSelected = () => {
    setPokemons(
      pokemons.filter(pokemon => !selectedPokemons.includes(pokemon.id))
    );
    setSelectedPokemons([]);
  };

  return (
    <div>
      <div className={classes.tableContainer}>
        <div>
          <PokemonSelectionToolbar onDelete={deleteSelected} />
        </div>
        <PokemonTable pokemons={processedPokemons} columns={POKEMON_COLUMNS} />
      </div>
      {!isDetailsEnabled && <PokemonDetailsBar className={classes.details} />}
    </div>
  );
};
