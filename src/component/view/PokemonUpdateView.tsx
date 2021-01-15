import * as React from "react";
import { Pokemon } from "../../data/Pokemon";
import { newOrChanged, bestFirst, duplicates } from "../../data/UpdateUtils";
import { useConfig } from "../context/ConfigContext";
import { usePokemons } from "../context/PokemonsContext";
import { SelectedPokemonsProvider } from "../context/SelectedPokemonsContext";
import { useCalceIVExport } from "../hook/useCalcIVExport";
import { useProcessedProkemons } from "../hook/useProcessedPokemons";
import { PokemonUpdater } from "./elements/PokemonUpdater";
import { LoadingView } from "./LoadingView";

const filter = (newPokemons: Pokemon[], pokemons: Pokemon[]) =>
  newPokemons
    .filter(newOrChanged(pokemons))
    .sort(bestFirst)
    .filter(duplicates);

export const PokemonUpdateView = () => {
  const [config] = useConfig();
  const [pokemons] = usePokemons();
  const [newPokemons, setNewPokemons] = useCalceIVExport(
    config.spreadsheetKey,
    config.newScanSheet
  );

  return !newPokemons ? (
    <LoadingView />
  ) : (
    <SelectedPokemonsProvider>
      <PokemonUpdater
        newPokemons={useProcessedProkemons(filter(newPokemons, pokemons))}
        setNewPokemons={setNewPokemons}
      />
    </SelectedPokemonsProvider>
  );
};
