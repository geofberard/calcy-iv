import * as React from "react";
import { FC } from "react";

interface ProdidersProps {
  combining: FC[];
}

export const Providers: FC<ProdidersProps> = ({ combining, children }) =>
  combining
    .reverse()
    .reduce((acc, Provider) => <Provider>{acc}</Provider>, <>{children}</>);
