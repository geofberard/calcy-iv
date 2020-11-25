import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { PokemonTable } from "./elements/PokemonTable";

const useStyles = makeStyles(theme => ({
  tableContainer: {
    padding: theme.spacing(3),
    height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
  },
}));

export const PokemonListView = () => {
  const classes = useStyles();

  return (
    <div className={classes.tableContainer}>
      <PokemonTable />
    </div>
  );
};
