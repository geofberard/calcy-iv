import * as React from "react";
import { Config } from "../../data/Config";
import {
  getConfigFromCookie,
  removeCookie,
  saveConfigAsCookie,
} from "../../service/CookieService";
import { getConfigFromUrl } from "../../service/UrlParamService";

type ConfigContextValue = [Config, (config: Config) => void, () => void];

const ConfigContext = React.createContext<ConfigContextValue>(null);

export const ConfigProvider: React.FC = ({ children }) => {
  const [config, setConfig] = React.useState<Config>(
    getConfigFromUrl() || getConfigFromCookie()
  );

  const saveConfig = (newConfig: Config) => {
    setConfig(newConfig);
    saveConfigAsCookie(newConfig);
  };

  const resetConfig = () => {
    removeCookie();
    setConfig(null);
  };

  return (
    <ConfigContext.Provider value={[config, saveConfig, resetConfig]}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => React.useContext(ConfigContext);
