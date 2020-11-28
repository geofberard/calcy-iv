import * as React from "react";
import { FC } from "react";
import { useSpreadSheet } from "../service/useSpreadSheet";
import { AppContainer } from "./AppContainer";
import { EventServiceProvider } from "./context/EventServiceContext";
import { ConfigProvider } from "./context/ConfigContext";
import { PokemonsProvider } from "./context/PokemonsContext";
import { PokedexProvider } from "./context/PokedexContext";

export const RootApp: FC = () => {
  const isAvailable = useSpreadSheet();

  return (
    isAvailable && (
      <EventServiceProvider>
        <ConfigProvider>
          <PokemonsProvider>
            <PokedexProvider>
              <AppContainer />
            </PokedexProvider>
          </PokemonsProvider>
        </ConfigProvider>
      </EventServiceProvider>
    )
  );
};
