import { Button, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import * as React from "react";
import { EditMode } from "../../../data/mode/Modes";
import { Pokemon } from "../../../data/Pokemon";
import { POKEMON_UPDATE_COLUMNS } from "../../../data/table/ColumnDesc";
import { notInUnion } from "../../../data/UpdateUtils";
import { usePokemons } from "../../context/PokemonsContext";
import { useSelectedPokemons } from "../../context/SelectedPokemonsContext";
import { createModeButton } from "../../menu/ModeButton";
import { PokemonSelectionToolbar } from "./PokemonSelectionToolbar";
import { PokemonTable } from "./PokemonTable";

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
  grow: {
    flexGrow: 1,
  },
}));

interface PokemonUpdaterProps {
  newPokemons: Pokemon[];
  setNewPokemons: (pokemon: Pokemon[]) => void;
}

export const PokemonUpdater = ({
  newPokemons,
  setNewPokemons,
}: PokemonUpdaterProps) => {
  const classes = useStyles();
  const [pokemons, setPokemons] = usePokemons();
  const [selectedPokemons, setSelectedPokemons] = useSelectedPokemons();
  const EditButton = createModeButton(EditMode);

  const onValidate = () => {
    setPokemons(
      [
        ...pokemons.filter(notInUnion(newPokemons)),
        ...newPokemons,
      ]
    );
    window.location.href = "#grid";
  };

  const deleteSelected = () => {
    setNewPokemons(
      newPokemons.filter(pokemon => !selectedPokemons.includes(pokemon.id))
    );
    setSelectedPokemons([]);
  };

  return (
    <div className={classes.tableContainer}>
      <div>
        <Toolbar variant="dense">
          <Button color="inherit" onClick={onValidate}>
            Validate
          </Button>
          <div className={classes.grow} />
          <EditButton />
        </Toolbar>
        <PokemonSelectionToolbar onDelete={deleteSelected} />
      </div>
      <PokemonTable pokemons={newPokemons} columns={POKEMON_UPDATE_COLUMNS} />
    </div>
  );
};
