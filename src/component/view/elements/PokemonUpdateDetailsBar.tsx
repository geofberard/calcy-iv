import { makeStyles } from "@material-ui/core";
import * as React from "react";
import { usePokemon } from "../../context/PokemonContext";
import { usePokemons } from "../../context/PokemonsContext";
import { PokemonCard } from "./PokemonCard";
import { getOriginal } from "../../../data/UpdateUtils";
import { PokemonCompare } from "./PokemonCompare";

interface PokemonUpdateDetailsBarProps {
  className: string;
}

const useStyles = makeStyles(() => ({
  bar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export const PokemonUpdateDetailsBar = ({
  className,
}: PokemonUpdateDetailsBarProps) => {
  const [currentPokemon] = usePokemon();
  const [originalPokemons] = usePokemons();
  const classes = useStyles();

  if (!currentPokemon) {
    return null;
  }

  const original = getOriginal(currentPokemon, originalPokemons);

  return (
    <div className={`${className} ${classes.bar}`}>
      {!original ? (
        <PokemonCard pokemon={currentPokemon} />
      ) : (
        <PokemonCompare original={original} updated={currentPokemon} />
      )}
    </div>
  );
};
