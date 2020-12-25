import * as React from "react";
import { loadFavoriteMoveSets } from "../../dao/FavoriteMoveSetsDao";
import { FavoriteMoveSets } from "../../data/pokemon/FavoriteMoveSets";
import { PokedexEntry } from "../../data/pokemon/PokedexEntry";
import { PokemonMove } from "../../data/pokemon/PokemonMove";
import {
  compareClean,
  findById,
  getDistance,
  getFromPath,
} from "../../data/Utils";
import { LoadingView } from "../view/LoadingView";
import { useConfig } from "./ConfigContext";
import { useEventService } from "./EventServiceContext";

const PokedexContext = React.createContext<[PokedexEntry[], PokemonMove[]]>([
  [],
  [],
]);

export const findByNameSafe: <T extends { name: string }>(
  name: string,
  elements: T[]
) => T = (name, elements) => {
  const foundElement = elements.find(element =>
    compareClean(element.name, name)
  );

  if (!foundElement) {
    const closest = elements.sort((a, b) =>
      getDistance(a.name, name) > getDistance(b.name, name) ? 1 : -1
    )[0].name;
    alert(`Could not find ${name} did you mean ${closest}`);
  }

  return foundElement;
};

export const findByName: <T extends { name: string }>(
  name: string,
  elements: T[]
) => T = (name, elements) =>
  elements.find(element => compareClean(element.name, name));

const computeMoves = (
  rawPokedexEntry: any,
  favoriteMoveSet: FavoriteMoveSets,
  path: string[],
  moves: PokemonMove[]
) => {
  const defaultMoveIds = getFromPath<string[]>(rawPokedexEntry, path);
  const favoriteMoveNames = getFromPath<string[]>(favoriteMoveSet, path);

  const completeFavoriteMoveSet =
    favoriteMoveNames &&
    favoriteMoveNames.length !== 0 &&
    favoriteMoveNames.map(name => findByNameSafe(name, moves));

  return (
    completeFavoriteMoveSet || defaultMoveIds.map(id => findById(id, moves))
  );
};

const toPokedexEntry = (
  moves: PokemonMove[],
  favoriteMoveSets: FavoriteMoveSets[]
) => (rawPokedexEntry: any) => {
  const favoriteMoveSet = findByName(rawPokedexEntry.name, favoriteMoveSets);

  const compute = (path: string[]) =>
    computeMoves(rawPokedexEntry, favoriteMoveSet, path, moves);

  const indexString = rawPokedexEntry.index.toString().padStart(3, "0");

  const value = {
    ...rawPokedexEntry,
    img: `https://images.gameinfo.io/pokemon/256/${indexString}-00.webp`,
    attackerMoves: {
      fastMoves: compute(["attackerMoves", "fastMoves"]),
      specialMoves: compute(["attackerMoves", "specialMoves"]),
    },
    defenderMoves: {
      fastMoves: compute(["defenderMoves", "fastMoves"]),
      specialMoves: compute(["defenderMoves", "specialMoves"]),
    },
  } as PokedexEntry;

  return value;
};

export const PokedexProvider: React.FC = ({ children }) => {
  const [pokedex, setPokedex] = React.useState<PokedexEntry[]>([]);
  const [moves, setMoves] = React.useState<PokemonMove[]>([]);
  const eventService = useEventService();
  const [config] = useConfig();

  const loadData = () =>
    Promise.all([
      fetch("data/pokedex.json").then(response => response.json()),
      fetch("data/moves.json").then(response => response.json()),
      loadFavoriteMoveSets(config.spreadsheetKey, config.pokedexSheet),
    ]).then(([rawPokedex, rawMoves, favoriteMoveSets]) => {
      setMoves(rawMoves);
      setPokedex(rawPokedex.map(toPokedexEntry(rawMoves, favoriteMoveSets)));
    });

  React.useEffect(() => {
    loadData();
    return eventService.subscribe(loadData);
  }, []);

  return (
    <PokedexContext.Provider value={[pokedex, moves]}>
      {moves.length !== 0 ? children : <LoadingView />}
    </PokedexContext.Provider>
  );
};

export const usePokedex = () => React.useContext(PokedexContext);
