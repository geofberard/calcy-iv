import {
  Collapse,
  Grid,
  Paper,
  Table,
  TableContainer,
} from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import * as React from "react";
import { EditMode } from "../../data/mode/Modes";
import { useMode } from "../context/ModeContext";
import { useProcessedProkemons } from "../hook/useProcessedPokemons";
import { PokemonGridItem } from "./elements/PokemonGridItem";
import { PokemonTableHeader } from "./elements/PokemonTableHeader";
import { PokemonTableToolbar } from "./elements/PokemonTableToolbar";

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
  const pokemons = useProcessedProkemons();
  const [isEditEnabled] = useMode(EditMode);

  return (
    <div className={classes.gridViewContainer}>
      <div>
        <Collapse in={isEditEnabled}>
          <PokemonTableToolbar />
        </Collapse>
      </div>
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
        <Grid container justify="center" spacing={1} className={classes.grid}>
          {pokemons.map(pokemon => (
            <PokemonGridItem pokemon={pokemon} />
          ))}
        </Grid>
      </div>
    </div>
  );
};
