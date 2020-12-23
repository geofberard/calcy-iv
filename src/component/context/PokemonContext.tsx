import * as React from "react";
import { Pokemon } from "../../data/Pokemon";
import { createStateContext, stateContextProvider } from "./StateContext";

const PokemonContext = createStateContext<Pokemon>();

export const PokemonProvider = stateContextProvider(PokemonContext);

export const usePokemon = () => React.useContext(PokemonContext);
