import { Config } from "../data/Config";

const CONFIG_CNAME = "config";

const KEY = "key";
const POKEMON = "pokemon";
const POKEDEX = "pokedex";

export const getConfigFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const spreadsheetKey = urlParams.get(KEY);
  const pokemonSheet = urlParams.get(POKEMON);
  const pokedexSheet = urlParams.get(POKEDEX);
  if(spreadsheetKey && pokemonSheet && pokedexSheet) {
    return {spreadsheetKey, pokemonSheet, pokedexSheet} as Config;
  }
  return null;
};

export const getUrlFromConfig = (config: Config) => {
  const params = `${KEY}=${config.spreadsheetKey}&${POKEMON}=${config.pokemonSheet}&${POKEDEX}=${config.pokedexSheet}`;
  return `${window.location.href}?${params}`;
};