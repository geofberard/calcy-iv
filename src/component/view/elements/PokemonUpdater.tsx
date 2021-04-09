import { Button, Toolbar } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import * as React from "react";
import { EditMode, DetailsMode } from "../../../data/mode/Modes";
import { Pokemon } from "../../../data/Pokemon";
import { POKEMON_UPDATE_COLUMNS } from "../../../data/table/ColumnDesc";
import { notInUnion } from "../../../data/UpdateUtils";
import { usePokemons } from "../../context/PokemonsContext";
import { useSelectedPokemons } from "../../context/SelectedPokemonsContext";
import { createModeButton } from "../../menu/ModeButton";
import { PokemonSelectionToolbar } from "./PokemonSelectionToolbar";
import { PokemonTable } from "./PokemonTable";
import { useMode } from "../../context/ModeContext";
import { PokemonDetailsBar } from "./PokemonDetailsBar";
import { PokemonUpdateDetailsBar } from "./PokemonUpdateDetailsBar";

const getHeight = (isDetailsEnabled: boolean, theme: Theme) =>
  `calc(${isDetailsEnabled ? 70 : 100}vh - ${
    theme.mixins.toolbar.minHeight
  }px)`;

const useStyles = makeStyles<Theme, boolean>(theme => ({
  tableContainer: {
    height: isDetailsEnabled => getHeight(isDetailsEnabled, theme),
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
  details: {
    height: "30vh",
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
  const [isDetailsEnabled] = useMode(DetailsMode);
  const classes = useStyles(isDetailsEnabled);
  const [pokemons, setPokemons] = usePokemons();
  const [selectedPokemons, setSelectedPokemons] = useSelectedPokemons();
  const EditButton = createModeButton(EditMode);

  const onValidate = () => {
    setPokemons([...pokemons.filter(notInUnion(newPokemons)), ...newPokemons]);
    window.location.href = "#grid";
  };

  const deleteSelected = () => {
    setNewPokemons(
      newPokemons.filter(pokemon => !selectedPokemons.includes(pokemon.id))
    );
    setSelectedPokemons([]);
  };

  return (
    <div>
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
      {isDetailsEnabled && <PokemonUpdateDetailsBar className={classes.details} />}
    </div>
  );
};
