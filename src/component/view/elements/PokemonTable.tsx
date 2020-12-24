import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import * as React from "react";
import { Pokemon } from "../../../data/Pokemon";
import { ColumnDesc, Fast, Special } from "../../../data/table/ColumnDesc";
import { SortingRule } from "../../../data/table/SortingRule";
import { useSearchQuery } from "../../context/SearchQueryContext";
import { TableStyleGetterProvider } from "../../context/TableStyleGetterContext";
import { usePokedexService } from "../../hook/usePokedexService";
import { PokemonRow } from "./PokemonRow";
import { PokemonTableHeader } from "./PokemonTableHeader";

export const useTableStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
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
  pokemon.statIV.toString().includes(searchQuery) ||
  pokemon.cp.toString().includes(searchQuery) ||
  pokemon.hp.toString().includes(searchQuery) ||
  pokemon.fastMove && pokemon.fastMove.name.includes(searchQuery) ||
  pokemon.specialMove && pokemon.specialMove.name.includes(searchQuery);

const byRule = (rule: SortingRule) => (a: Pokemon, b: Pokemon) =>
  !rule ? 0 : rule.column.type.sort(rule.column.getValue(a), rule.column.getValue(b)) *
      (rule.ascending ? 1 : -1);

interface PokemonTableProps {
  pokemons: Pokemon[];
}

export const PokemonTable = ({ pokemons }: PokemonTableProps) => {
  const classes = useTableStyles();
  const [sortingRule, setSortingRule] = React.useState<SortingRule>();
  const pokedexService = usePokedexService();
  const [searchQuery] = useSearchQuery();

  const styleGetter = (pokemon: Pokemon, column: ColumnDesc) => {
    if (pokedexService.getPokedexEntry(pokemon)) {
      if (column === Fast) {
        return pokedexService.hasGoodMove(pokemon, pokemon.fastMove) ? classes.green : classes.red;
      }
      if (column === Special) {
        return pokedexService.hasGoodMove(pokemon, pokemon.specialMove) ? classes.green : classes.red;
      }
    }
    return null;
  };

  return (
    <TableStyleGetterProvider getStyle={styleGetter}>
      <TableContainer component={Paper}>
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
