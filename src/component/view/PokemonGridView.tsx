import { Grid, Paper, Table, TableContainer } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import * as React from "react";
import { useProcessedProkemons } from "../hook/useProcessedPokemons";
import { PokemonGridItem } from "./elements/PokemonGridItem";
import { PokemonTableHeader } from "./elements/PokemonTableHeader";
import { PokemonTableToolbar } from "./elements/PokemonTableToolbar";
import { useSelectedPokemons } from "../context/SelectedPokemonsContext";
import { PokemonSelectionToolbar } from "./elements/PokemonSelectionToolbar";
import { usePokemons } from "../context/PokemonsContext";
import { POKEMON_COLUMNS } from "../../data/table/ColumnDesc";

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
      "&:first-child": {
        width: 40,
      },
    },
  },
  gridContainer: {
    overflowY: "scroll",
  },
  grid: {
    margin: "0 auto",
    maxWidth: 480,
  },
}));

export const PokemonGridView = () => {
  const classes = useStyles();
  const [pokemons, setPokemons] = usePokemons();
  const processedPokemons = useProcessedProkemons(pokemons);
  const [selectedPokemons, setSelectedPokemons] = useSelectedPokemons();

  const deleteSelected = () => {
    setPokemons(
      pokemons.filter(pokemon => !selectedPokemons.includes(pokemon.id))
    );
    setSelectedPokemons([]);
  };

  return (
    <div className={classes.gridViewContainer}>
      <div>
        <PokemonSelectionToolbar onDelete={deleteSelected} />
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table
            stickyHeader
            className={classes.sortingTable}
            size="small"
            aria-label="a dense table"
          >
            <PokemonTableHeader columns={POKEMON_COLUMNS} />
          </Table>
        </TableContainer>
      </div>
      <div className={classes.gridContainer}>
        <Grid container justify="center" spacing={1} className={classes.grid}>
          {processedPokemons.map(pokemon => (
            <PokemonGridItem pokemon={pokemon} />
          ))}
        </Grid>
      </div>
    </div>
  );
};
