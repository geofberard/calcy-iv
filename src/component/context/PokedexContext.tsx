import * as React from "react";
import { PokedexEntry } from "../../data/pokemon/PokedexEntry";
import { PokemonMove } from "../../data/pokemon/PokemonMove";
import { useEventService } from "./EventServiceContext";
import { PokemonMoveSet } from "../../data/pokemon/PokemonMoveSet";

const PokedexContext = React.createContext<[PokedexEntry[], PokemonMove[]]>([
  [],
  [],
]);

const toMoveSet = (rawMoveSet: any, moves: PokemonMove[]) =>
  ({
    fastMoves: rawMoveSet.fastMoves.map(id =>
      moves.find(move => move.id === id)
    ),
    specialMoves: rawMoveSet.specialMoves.map(id =>
      moves.find(move => move.id === id)
    ),
  } as PokemonMoveSet);

const toPokedexEntry = (moves: PokemonMove[]) => (rawPokedexEntry: any) =>
  ({
    ...rawPokedexEntry,
    attackerMoves: toMoveSet(rawPokedexEntry.attackerMoves, moves),
    defenderMoves: toMoveSet(rawPokedexEntry.defenderMoves, moves),
  } as PokedexEntry);

export const PokedexProvider: React.FC = ({ children }) => {
  const [pokedex, setPokedex] = React.useState<PokedexEntry[]>([]);
  const [moves, setMoves] = React.useState<PokemonMove[]>([]);
  const eventService = useEventService();

  const loadData = () =>
    Promise.all([
      fetch("/data/pokedex.json").then(response => response.json()),
      fetch("/data/moves.json").then(response => response.json()),
    ]).then(([rawPokedex, rawMoves]) => {
      setMoves(rawMoves);
      setPokedex(rawPokedex.map(toPokedexEntry(rawMoves)));
    });

  React.useEffect(() => {
    loadData();
    return eventService.subscribe(loadData);
  }, []);

  return (
    <PokedexContext.Provider value={[pokedex, moves]}>
      {moves.length !== 0 ? children : null}
    </PokedexContext.Provider>
  );
};

export const usePokedex = () => React.useContext(PokedexContext);
