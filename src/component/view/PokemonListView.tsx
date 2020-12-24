import { Collapse, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import * as React from "react";
import { EditMode } from "../../data/mode/Modes";
import { useMode } from "../context/ModeContext";
import { PokemonProvider } from "../context/PokemonContext";
import { usePokemons } from "../context/PokemonsContext";
import { SelectedPokemonsProvider } from "../context/SelectedPokemonsContext";
import { PokemonTable } from "./elements/PokemonTable";
import { PokemonTableToolbar } from "./elements/PokemonTableToolbar";

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
  const [pokemons] = usePokemons();
  const [isEditEnabled] = useMode(EditMode);

  return (
    <>
      <PokemonProvider>
        <SelectedPokemonsProvider>
          <div className={classes.tableContainer}>
            <div>
              <Collapse in={isEditEnabled}>
                <PokemonTableToolbar />
              </Collapse>
            </div>
            <PokemonTable pokemons={pokemons} />
          </div>
        </SelectedPokemonsProvider>
      </PokemonProvider>
    </>
  );
};
