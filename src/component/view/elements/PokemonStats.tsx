import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import * as React from "react";
import { Pokemon } from "../../../data/Pokemon";

interface PokemonStatsProps {
  pokemon: Pokemon;
}

export const PokemonStats = ({ pokemon }: PokemonStatsProps) => {
  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">IV</TableCell>
            <TableCell align="center">Attack</TableCell>
            <TableCell align="center">Defense</TableCell>
            <TableCell align="center">Stamina</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="center">{pokemon.statIV}</TableCell>
            <TableCell align="center">{pokemon.statAtt}</TableCell>
            <TableCell align="center">{pokemon.statDef}</TableCell>
            <TableCell align="center">{pokemon.statSta}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
