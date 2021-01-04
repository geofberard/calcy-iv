import { Pokemon } from "../../data/Pokemon";
import { SortingRule } from "../../data/table/SortingRule";
import { usePokemons } from "../context/PokemonsContext";
import { useSearchQuery } from "../context/SearchQueryContext";
import { useSorting } from "../context/SortingContext";
import { StateContext } from "../context/StateContext";

const byQuery = (searchQuery: string) => (pokemon: Pokemon) =>
  !searchQuery ||
  pokemon.name.includes(searchQuery) ||
  pokemon.statIV.toString().includes(searchQuery) ||
  pokemon.cp.toString().includes(searchQuery) ||
  pokemon.hp.toString().includes(searchQuery) ||
  (pokemon.fastMove && pokemon.fastMove.name.includes(searchQuery)) ||
  (pokemon.specialMove && pokemon.specialMove.name.includes(searchQuery));

const byRule = (rule: SortingRule) => (a: Pokemon, b: Pokemon) =>
  !rule ? 0 : rule.column.type.sort(rule.column.getValue(a), rule.column.getValue(b)) *
      (rule.ascending ? 1 : -1);

export const useProcessedProkemons = () => {
  const [pokemons, setPokemon] = usePokemons();
  const [sortingRule] = useSorting();
  const [searchQuery] = useSearchQuery();
  return pokemons.filter(byQuery(searchQuery)).sort(byRule(sortingRule));
};
