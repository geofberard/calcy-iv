import * as React from "react";
import { Config } from "../../data/Config";
import { StateContext } from "./StateContext";
import { saveConfigAsCookie, getConfigFromCookie } from "../../service/CookieService";

const ConfigContext = React.createContext<StateContext<Config>>(null);

export const ConfigProvider: React.FC = ({ children }) => {
  const [config, setConfig] = React.useState<Config>(getConfigFromCookie());

  const saveConfig = (newConfig: Config) => {
    setConfig(newConfig);
    saveConfigAsCookie(newConfig);
  };

  return (
    <ConfigContext.Provider value={[config, saveConfig]}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => React.useContext(ConfigContext);
