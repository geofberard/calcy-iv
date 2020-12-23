import * as React from "react";
import { Pokemon } from "../../data/Pokemon";
import {
  createStateContext,
  StateContext,
  stateContextProvider,
} from "./StateContext";

const SelectedPokemonsContext = createStateContext<string[]>();

export const SelectedPokemonsProvider = stateContextProvider(
  SelectedPokemonsContext,
  []
);

export const useSelectedPokemons = () =>
  React.useContext(SelectedPokemonsContext);

export const useInSelectedPokemon: (pokemon: Pokemon) => StateContext<boolean> = (
  pokemon: Pokemon
) => {
  const [selectedPokemons, setSelectedPokemons] = useSelectedPokemons();

  const isSelected = selectedPokemons.includes(pokemon.id);

  const setSelected = (enabled: boolean) => {
    const otherPokemons = selectedPokemons.filter(
      current => current !== pokemon.id
    );
    setSelectedPokemons(enabled ? [...otherPokemons, pokemon.id] : otherPokemons);
  };

  return [isSelected, setSelected];
};
