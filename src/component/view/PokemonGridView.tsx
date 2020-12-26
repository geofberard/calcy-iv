import { Grid, Paper, Table, TableContainer } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import * as React from "react";
import { usePokemons } from "../context/PokemonsContext";
import { useProcessedProkemons } from "../hook/useProcessedPokemons";
import { PokemonGridItem } from "./elements/PokemonGridItem";
import { PokemonTable } from "./elements/PokemonTable";
import { PokemonTableHeader } from "./elements/PokemonTableHeader";

const useStyles = makeStyles((theme: Theme) => ({
  gridViewContainer: {
    height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
    display: "flex",
    flexDirection: "column",
  },
  sortingTable: {
    tableLayout: "fixed",
    "& th": {
      textAlign: "center",
    },
  },
  gridContainer: {
    overflowY: "scroll",
  },
  grid: {
    margin: "0 auto",
    maxWidth: 500,
  },
}));

export const PokemonGridView = () => {
  const classes = useStyles();
  const pokemons = useProcessedProkemons();

  return (
    <div className={classes.gridViewContainer}>
      <div>
        <TableContainer component={Paper}>
          <Table
            stickyHeader
            className={classes.sortingTable}
            size="small"
            aria-label="a dense table"
          >
            <PokemonTableHeader />
          </Table>
        </TableContainer>
      </div>
      <div className={classes.gridContainer}>
        <Grid container justify="center" spacing={6} className={classes.grid}>
          {pokemons.map(pokemon => (
            <PokemonGridItem pokemon={pokemon} />
          ))}
        </Grid>
      </div>
    </div>
  );
};
