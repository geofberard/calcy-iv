import * as React from "react";
import { loadPokedex } from "../../dao/PokedexDao";
import { PokedexEntry } from "../../data/PokedexEntry";
import { useConfig } from "./ConfigContext";
import { useEventService } from "./EventServiceContext";

const PokedexContext = React.createContext<PokedexEntry[]>([]);

export const PokedexProvider: React.FC = ({ children }) => {
  const [pokedex, setPokedex] = React.useState<PokedexEntry[]>([]);
  const [config,] = useConfig();
  const eventService = useEventService();

  const loadData = () =>
    loadPokedex(
      config.spreadsheetKey,
      config.pokedexSheet
    ).then(loadedPokedex => setPokedex(loadedPokedex));

  React.useEffect(() => {
    loadData();
    return eventService.subscribe(loadData);
  }, [config]);

  return (
    <PokedexContext.Provider value={pokedex}>
      {children}
    </PokedexContext.Provider>
  );
};

export const usePokedex = () => React.useContext(PokedexContext);
