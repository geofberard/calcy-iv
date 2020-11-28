import * as React from "react";
import { Config } from "../../data/Config";
import { StateContext } from "./StateContext";

const ConfigContext = React.createContext<StateContext<Config>>(null);

export const ConfigProvider: React.FC = ({ children }) => {
  // const [config, setConfig] = React.useState<Config>({
  //   spreadsheetKey: "1ftOH6puWKaWCpcVzTb-1h_tVUcbji-WO6vQizNUmSuo",
  //   pokemonSheet: "Sheet11",
  //   pokedexSheet: "Sheet14",
  // });
  const [config, setConfig] = React.useState<Config>(null);

  return (
    <ConfigContext.Provider value={[config, setConfig]}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => React.useContext(ConfigContext);
