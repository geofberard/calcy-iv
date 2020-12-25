import { Grid } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import * as React from "react";
import { Pokemon } from "../../../data/Pokemon";
import { usePokedexService } from "../../hook/usePokedexService";

const useStyles = makeStyles((theme: Theme) => ({
  gridItem: {
    position: "relative",
  },
  image: {
    width: 120,
    paddingTop: 10,
  },
  centered: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
  },
  pcLabel: {
    fontSize: 11,
    color: "#96abac",
    fontWeight: "bold",
  },
  pcValue: {
    fontSize: 24,
    color: "#44696c",
    fontWeight: "bold",
  },
  name: {
    fontSize: 18,
    color: "#44696c",
    fontWeight: "bold",
    bottom: 14,
  },
  greenBar: {
    content: "",
    bottom: 5,
    height: 5,
    width: 70,
    border: "1px solid #6dedb7",
    borderRadius: 40,
    background: "#6dedb7",
  },
}));

interface PokemonGridItemProps {
  pokemon: Pokemon;
}

export const PokemonGridItem = ({ pokemon }: PokemonGridItemProps) => {
  const classes = useStyles();
  const pokedex = usePokedexService();

  return (
    <Grid key={pokemon.id} xs={4} item className={classes.gridItem}>
      <div className={classes.centered}>
        <span className={classes.pcLabel}>PC</span>
        <span className={classes.pcValue}>{pokemon.cp}</span>
      </div>
      <img
        src={
          pokedex.getPokedexEntry(pokemon) &&
          pokedex.getPokedexEntry(pokemon).img
        }
        className={classes.image}
        alt="pokemon"
      />
      <div className={`${classes.centered} ${classes.name}`}>
        {pokemon.nickname}
      </div>
      <div className={`${classes.centered} ${classes.greenBar}`}/>
    </Grid>
  );
};
