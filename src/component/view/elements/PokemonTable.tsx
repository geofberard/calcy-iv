import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import * as React from "react";
import { Pokemon } from "../../../data/Pokemon";
import { PokedexEntry } from "../../../data/pokemon/PokedexEntry";
import { ColumnDesc, Fast, Special } from "../../../data/table/ColumnDesc";
import { SortingRule } from "../../../data/table/SortingRule";
import { useSearchQuery } from "../../context/SearchQueryContext";
import { usePokedexService } from "../../hook/usePokedexService";
import { TableStyleGetterProvider } from "../../context/TableStyleGetterContext";
import { PokemonRow } from "./PokemonRow";
import { PokemonTableHeader } from "./PokemonTableHeader";

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    height: "100%",
  },
  idCell: {
    width: 10,
  },
  red: {
    backgroundColor: theme.palette.error.light,
  },
  green: {
    backgroundColor: theme.palette.success.light,
  },
}));

const byQuery = (searchQuery: string) => (pokemon: Pokemon) =>
  !searchQuery ||
  pokemon.name.includes(searchQuery) ||
  pokemon.fastMove.includes(searchQuery) ||
  pokemon.specialMove.includes(searchQuery);

const byRule = (rule: SortingRule) => (a: Pokemon, b: Pokemon) =>
  !rule ? 0 : rule.column.type.sort(rule.column.getValue(a), rule.column.getValue(b)) *
      (rule.ascending ? 1 : -1);

interface PokemonTableProps {
  pokemons: Pokemon[];
}

const getPokedexInfo = (pokemon: Pokemon, pokedex: PokedexEntry[]) => {
  return pokedex.find(pokedexEntry => pokedexEntry.name === pokemon.name);
};

const hasGoodFastMove = (pokemon: Pokemon, pokedexEntry: PokedexEntry) =>
  pokedexEntry.attackerMoves.fastMoves.some(move => move.name === pokemon.fastMove);

const hasGoodSpecialMove = (pokemon: Pokemon, pokedexEntry: PokedexEntry) =>
  pokedexEntry.attackerMoves.specialMoves.some(move => move.name === pokemon.specialMove);

export const PokemonTable = ({ pokemons }: PokemonTableProps) => {
  const classes = useStyles();
  const [sortingRule, setSortingRule] = React.useState<SortingRule>();
  const pokedexService = usePokedexService();
  const [searchQuery] = useSearchQuery();

  const styleGetter = (pokemon: Pokemon, column: ColumnDesc) => {
    // const pokedexEntry = getPokedexInfo(pokemon, pokedex);

    // if (pokedexEntry) {
      if (column === Fast) {
        return pokedexService.hasGoodMove(pokemon, pokemon.fastMove) ? classes.green : classes.red;
      }
      if (column === Special) {
        return pokedexService.hasGoodMove(pokemon, pokemon.specialMove) ? classes.green : classes.red;
      }
    // }
    return null;
  };

  return (
    <TableStyleGetterProvider getStyle={styleGetter}>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table
          stickyHeader
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <PokemonTableHeader
            sortingRule={sortingRule}
            setSortingRule={setSortingRule}
          />
          <TableBody>
            {pokemons
              .filter(byQuery(searchQuery))
              .sort(byRule(sortingRule))
              .map((pokemon, index) => (
                <PokemonRow index={index} pokemon={pokemon} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </TableStyleGetterProvider>
  );
};
