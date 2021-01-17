import { makeStyles } from "@material-ui/core";
import * as React from "react";
import { usePokemon } from "../../context/PokemonContext";
import { usePokemons } from "../../context/PokemonsContext";
import { PokemonCard } from "./PokemonCard";

interface PokemonDetailsBarProps {
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

export const PokemonDetailsBar = ({ className }: PokemonDetailsBarProps) => {
  const [currentPokemon, setCurrentPokemon] = usePokemon();
  const classes = useStyles();
  const [pokemons] = usePokemons();

  return !currentPokemon ? null : (
    <div className={`${className} ${classes.bar}`}>
      <PokemonCard pokemon={currentPokemon} />
    </div>
  );
};
