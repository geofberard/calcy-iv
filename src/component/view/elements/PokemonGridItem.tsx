import { Grid } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import * as React from "react";
import { EditMode } from "../../../data/mode/Modes";
import { Pokemon } from "../../../data/Pokemon";
import { getPokemonImage } from "../../../service/PokemonService";
import { useMode } from "../../context/ModeContext";
import { usePokemon } from "../../context/PokemonContext";
import { useInSelectedPokemon } from "../../context/SelectedPokemonsContext";
import { usePokedexService } from "../../hook/usePokedexService";

const primaryTextColor = "#44696c";
const secondaryTextColor = "#97abac";
const lifeBarColor = "#6dedb7";
const selectedColor = "#e3f7db";

const useStyles = makeStyles((theme: Theme) => ({
  gridItem: {
    position: "relative",
    padding: 10,
    textAlign: "center",
    borderRadius: 5,
  },
  image: {
    width: 120,
    height: 145,
    paddingTop: 10,
    paddingBottom: 15,
    margin: "0 auto",
  },
  centered: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
  },
  pcLabel: {
    fontSize: 11,
    color: secondaryTextColor,
    fontWeight: "bold",
  },
  pcValue: {
    fontSize: 24,
    color: primaryTextColor,
    fontWeight: "bold",
  },
  name: {
    fontSize: 18,
    color: primaryTextColor,
    fontWeight: "bold",
    bottom: 15,
  },
  greenBar: {
    content: "",
    bottom: 7,
    height: 5,
    width: 70,
    border: "1px solid #6dedb7",
    borderRadius: 40,
    background: lifeBarColor,
  },
  highlighted: {
    backgroundColor: selectedColor,
  },
}));

interface PokemonGridItemProps {
  pokemon: Pokemon;
}

export const PokemonGridItem = ({ pokemon }: PokemonGridItemProps) => {
  const classes = useStyles();
  const pokedex = usePokedexService();

  const [currentPokemon, setCurrentPokemon] = usePokemon();
  const [isSelected, setSelected] = useInSelectedPokemon(pokemon);
  const [isEditEnabled] = useMode(EditMode);

  const isHighlighted =
    pokemon === currentPokemon || (isEditEnabled && isSelected);

  const onClick = () => {
    if (isEditEnabled) {
      setSelected(!isSelected);
    }
  };

  return (
    <Grid
      key={pokemon.id}
      xs={4}
      item
      onMouseEnter={() => setCurrentPokemon(pokemon)}
      onMouseLeave={() => setCurrentPokemon(undefined)}
      onFocus={() => setCurrentPokemon(pokemon)}
      onClick={onClick}
    >
      <div
        className={`${isHighlighted && classes.highlighted} ${
          classes.gridItem
        }`}
      >
        <div className={classes.centered}>
          <span className={classes.pcLabel}>PC</span>
          <span className={classes.pcValue}>{pokemon.cp}</span>
        </div>
        <img
          src={getPokemonImage(pokemon)}
          className={classes.image}
          alt="pokemon"
        />
        <div className={`${classes.centered} ${classes.name}`}>
          {pokemon.nickname}
        </div>
        <div className={`${classes.centered} ${classes.greenBar}`} />
      </div>
    </Grid>
  );
};
