import { makeStyles, Theme, Collapse } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import * as React from "react";
import { useSelectedPokemons } from "../../context/SelectedPokemonsContext";
import { useMode } from "../../context/ModeContext";
import { EditMode } from "../../../data/mode/Modes";

const useToolbarStyles = makeStyles((theme: Theme) => ({
  title: {
    flex: "1 1 100%",
  },
}));

interface PokemonSelectionToolbarProps {
  onDelete: () => void;
}

export const PokemonSelectionToolbar = ({
  onDelete,
}: PokemonSelectionToolbarProps) => {
  const classes = useToolbarStyles();
  const [isEditEnabled] = useMode(EditMode);
  const [selectedPokemons] = useSelectedPokemons();

  return (
    <Collapse in={isEditEnabled}>
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
            <IconButton aria-label="delete" onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    </Collapse>
  );
};
