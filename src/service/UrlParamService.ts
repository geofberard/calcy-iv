import { Config } from "../data/Config";

const CONFIG_CNAME = "config";

const KEY = "key";
const POKEMON = "pokemon";
const POKEDEX = "pokedex";
const NEW_SCAN = "newScan";

export const getConfigFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const spreadsheetKey = urlParams.get(KEY);
  const pokemonSheet = urlParams.get(POKEMON);
  const newScanSheet = urlParams.get(NEW_SCAN);
  const pokedexSheet = urlParams.get(POKEDEX);
  if (spreadsheetKey && pokemonSheet && pokedexSheet) {
    return {
      spreadsheetKey,
      pokemonSheet,
      newScanSheet,
      pokedexSheet,
    } as Config;
  }
  return null;
};

export const getUrlFromConfig = (config: Config) => {
  const mandatoryParams = `${KEY}=${config.spreadsheetKey}&${POKEMON}=${config.pokemonSheet}`;
  const optionalParams = `${NEW_SCAN}=${config.newScanSheet}&${POKEDEX}=${config.pokedexSheet}`;
  return `${window.location.href}?${mandatoryParams}&${optionalParams}`;
};
