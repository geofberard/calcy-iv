import { Grid, Paper, Table, TableContainer } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import * as React from "react";
import { DetailsMode } from "../../data/mode/Modes";
import { POKEMON_COLUMNS } from "../../data/table/ColumnDesc";
import { useMode } from "../context/ModeContext";
import { usePokemons } from "../context/PokemonsContext";
import { useSelectedPokemons } from "../context/SelectedPokemonsContext";
import { useProcessedProkemons } from "../hook/useProcessedPokemons";
import { PokemonDetailsBar } from "./elements/PokemonDetailsBar";
import { PokemonGridItem } from "./elements/PokemonGridItem";
import { PokemonSelectionToolbar } from "./elements/PokemonSelectionToolbar";
import { PokemonTableHeader } from "./elements/PokemonTableHeader";

const getHeight = (isDetailsEnabled: boolean, theme: Theme) =>
  `calc(${isDetailsEnabled ? 70 : 100}vh - ${
    theme.mixins.toolbar.minHeight
  }px)`;

const useStyles = makeStyles<Theme, boolean>(theme => ({
  gridViewContainer: {
    height: isDetailsEnabled => getHeight(isDetailsEnabled, theme),
    display: "flex",
    flexDirection: "column",
    transition: theme.transitions.create(["height", "transform"], {
      duration: theme.transitions.duration.standard,
    }),
    background: "none",
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
  details: {
    height: "30vh",
  },
}));

export const PokemonGridView = () => {
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
      <Paper className={classes.gridViewContainer}>
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
      </Paper>
      {isDetailsEnabled && <PokemonDetailsBar className={classes.details} />}
    </div>
  );
};
