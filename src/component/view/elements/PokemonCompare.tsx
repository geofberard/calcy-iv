import {
  makeStyles,
  Theme,
  Card,
  CardContent,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core";
import * as React from "react";
import { Pokemon } from "../../../data/Pokemon";
import { useOffsetNavigation } from "../../hook/useOffsetNavigation";

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    maxWidth: 1000,
  },
  row: {
    height: 45,
  },
}));

interface PokemonCompareProps {
  original: Pokemon;
  updated: Pokemon;
}

export const sanitize = (info: any) => {
  if (info instanceof Date) {
    return info.getTime();
  }
  return info || "-";
};

export const PokemonCompare = ({ original, updated }: PokemonCompareProps) => {
  const classes = useStyles();
  const offset = useOffsetNavigation(Object.keys(original.raw).length);

  console.log(offset);

  return (
    <Card className={classes.card}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow className={classes.row}>
            <TableCell />
            {Object.keys(original.raw)
              .slice(offset)
              .map(key => (
                <TableCell>{key}</TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className={classes.row}>
            <TableCell>Original</TableCell>
            {Object.values(original.raw)
              .slice(offset)
              .map(value => (
                <TableCell>{sanitize(value)}</TableCell>
              ))}
          </TableRow>
          <TableRow className={classes.row}>
            <TableCell>Updated</TableCell>
            {Object.values(updated.raw)
              .slice(offset)
              .map(value => (
                <TableCell>{sanitize(value)}</TableCell>
              ))}
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};
