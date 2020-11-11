import * as React from "react";
import { FC } from "react";
import { useSpreadSheet } from "../service/useSpreadSheet";
import { AppContainer } from "./AppContainer";

export const RootApp: FC = () => {
  const isAvailable = useSpreadSheet();

  return isAvailable && <AppContainer />;
};
