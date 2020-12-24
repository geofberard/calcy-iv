import { makeStyles, Theme } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import * as React from "react";
import { usePokemons } from "../../context/PokemonsContext";
import { useSelectedPokemons } from "../../context/SelectedPokemonsContext";

const useToolbarStyles = makeStyles((theme: Theme) => ({
  title: {
    flex: "1 1 100%",
  },
}));

export const PokemonTableToolbar = () => {
  const classes = useToolbarStyles();
  const [pokemons, setPokemons] = usePokemons();
  const [selectedPokemons, setSelectedPokemons] = useSelectedPokemons();

  const deleteSelected = () => {
    setPokemons(
      pokemons.filter(pokemon => !selectedPokemons.includes(pokemon.id))
    );
    setSelectedPokemons([]);
  };

  return (
    <Toolbar variant="dense">
      <Typography
        className={classes.title}
        color="inherit"
        variant="subtitle1"
        component="div"
      >
        {selectedPokemons.length} selected
      </Typography>
      {selectedPokemons.length > 0 && (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={deleteSelected}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};
