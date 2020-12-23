import * as React from "react";
import { createStateContext, stateContextProvider } from "./StateContext";

const SearchQueryContext = createStateContext<string>();

export const SearchQueryProvider = stateContextProvider(SearchQueryContext, "");

export const useSearchQuery = () => React.useContext(SearchQueryContext);
