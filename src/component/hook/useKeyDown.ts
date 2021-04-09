import { DependencyList, useEffect } from "react";

export const useKeyDown = (
  callback: (event: KeyboardEvent) => void,
  deps?: DependencyList
) => {
  useEffect(() => {
    window.addEventListener("keydown", callback);
    return () => window.removeEventListener("keydown", callback);
  }, deps);
};
