import * as React from "react";
import { Config } from "../../data/Config";

const ConfigContext = React.createContext<Config>(null);

export const ConfigProvider: React.FC = ({ children }) => {
  const [config, setConfig] = React.useState<Config>({
    spreadsheetKey: "1ftOH6puWKaWCpcVzTb-1h_tVUcbji-WO6vQizNUmSuo",
    pokemonSheet: "Sheet11",
    pokemonpokedex: "Pokedex2",
  });

  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => React.useContext(ConfigContext);
