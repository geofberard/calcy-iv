import * as React from "react";
import { useConfig } from "../context/ConfigContext";
import { SelectedPokemonsProvider } from "../context/SelectedPokemonsContext";
import { useCalceIVExport } from "../hook/useCalcIVExport";
import { PokemonUpdater } from "./elements/PokemonUpdater";
import { LoadingView } from "./LoadingView";

export const PokemonUpdateView = () => {
  const [config] = useConfig();
  const [pokemons, setPokemons] = useCalceIVExport(
    config.spreadsheetKey,
    config.newScanSheet
  );

  return !pokemons ? (
    <LoadingView />
  ) : (
    <SelectedPokemonsProvider>
      <PokemonUpdater newPokemons={pokemons} setNewPokemons={setPokemons} />
    </SelectedPokemonsProvider>
  );
};
