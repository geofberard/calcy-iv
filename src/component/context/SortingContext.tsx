import * as React from "react";
import { SortingRule } from "../../data/table/SortingRule";
import { createStateContext, stateContextProvider } from "./StateContext";

const SortingContext = createStateContext<SortingRule>();

export const SortingProvider = stateContextProvider(SortingContext);

export const useSorting = () => React.useContext(SortingContext);
