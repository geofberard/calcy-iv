import * as React from "react";
import { Pokemon } from "../../data/Pokemon";
import { ColumnDesc } from "../../data/table/ColumnDesc";

export type StyleGetter = (pokemon:Pokemon, column:ColumnDesc) => string;

const TableStyleGetterContext = React.createContext<StyleGetter>(() => "");

interface TableStyleGetterProviderProps {
  getStyle: StyleGetter;
}

export const TableStyleGetterProvider: React.FC<TableStyleGetterProviderProps> = ({ getStyle, children }) => (
    <TableStyleGetterContext.Provider value={getStyle}>
      {children}
    </TableStyleGetterContext.Provider>
  );

export const useStyleGetter = () => React.useContext(TableStyleGetterContext);
