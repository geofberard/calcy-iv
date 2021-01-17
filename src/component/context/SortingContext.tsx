import * as React from "react";
import { SortingRule } from "../../data/table/SortingRule";
import { createStateContext, stateContextProvider } from "./StateContext";
import { CP } from "../../data/table/ColumnDesc";

const SortingContext = createStateContext<SortingRule>();

export const SortingProvider = stateContextProvider(SortingContext, {column: CP, ascending:false});

export const useSorting = () => React.useContext(SortingContext);
