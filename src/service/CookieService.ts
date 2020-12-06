import { Config } from "../data/Config";

const CONFIG_CNAME = "config";

export const getConfigFromCookie = () => {
  const name = `${CONFIG_CNAME}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      const newLocal = c.substring(name.length, c.length).split("§");
      return {spreadsheetKey:newLocal[0], pokemonSheet:newLocal[1], pokedexSheet:newLocal[2]} as Config;
    }
  }
  return null;
};

export const saveConfigAsCookie = (config: Config | undefined) => {
  const d = new Date();
  d.setTime(d.getTime() + (10 * 365 * 24 * 60 * 60 * 1000));
  const cookieValue = `${config.spreadsheetKey}§${config.pokemonSheet}§${config.pokedexSheet || ""}`;
  document.cookie = `${CONFIG_CNAME}=${cookieValue};expires=${d.toUTCString()}`;
};

export const removeCookie = () => {
  document.cookie = `${CONFIG_CNAME}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};