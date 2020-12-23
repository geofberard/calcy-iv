import * as React from "react";

export type StateContext<T> = [T, (value: T) => void];

export const createStateContext = <T extends unknown>() =>
  React.createContext<StateContext<T>>(null);

export const stateContextProvider = <T extends any>(
  Context: React.Context<StateContext<T>>,
  defaultValue?: T,
) => ({ children }) => {
  const [value, setValue] = React.useState<T>(defaultValue);

  return (
    <Context.Provider value={[value, setValue]}>{children}</Context.Provider>
  );
};
