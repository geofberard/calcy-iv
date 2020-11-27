import * as React from "react";
import { loadPokedex } from "../../dao/PokedexDao";
import { PokedexEntry } from "../../data/PokedexEntry";
import { useConfig } from "./ConfigContext";

const PokedexContext = React.createContext<PokedexEntry[]>([]);

export const PokedexProvider: React.FC = ({ children }) => {
  const [pokedex, setPokedex] = React.useState<PokedexEntry[]>([]);
  const config = useConfig();

  React.useEffect(() => {
    loadPokedex(
      config.spreadsheetKey,
      config.pokedexSheet
    ).then(loadedPokedex => setPokedex(loadedPokedex));
  }, [config]);

  return (
    <PokedexContext.Provider value={pokedex}>
      {children}
    </PokedexContext.Provider>
  );
};

export const usePokedex = () => React.useContext(PokedexContext);
