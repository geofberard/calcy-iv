import * as React from "react";
import { StateContext } from "./StateContext";

const SearchQueryContext = React.createContext<StateContext<string>>(null);

export const SearchQueryProvider: React.FC = ({ children }) => {
  const [pokemon, setPokemon] = React.useState<string>();

  return (
    <SearchQueryContext.Provider value={[pokemon, setPokemon]}>
      {children}
    </SearchQueryContext.Provider>
  );
};

export const useSearchQuery = () => React.useContext(SearchQueryContext);
