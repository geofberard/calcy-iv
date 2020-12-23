import * as React from "react";
import { Mode } from "../../data/mode/Mode";
import {
  createStateContext,
  StateContext,
  stateContextProvider,
} from "./StateContext";

const ModeContext = createStateContext<Mode[]>();

export const ModeProvider = stateContextProvider(ModeContext,[]);

export const useMode: (mode: Mode) => StateContext<boolean> = mode => {
  const [modes, setModes] = React.useContext(ModeContext);

  const isEnabled = modes.includes(mode);

  const setEnabled = (enabled: boolean) => {
    const otherModes = modes.filter(current => current !== mode);
    setModes(enabled ? [...otherModes, mode] : otherModes);
  };

  return [isEnabled, setEnabled];
};
