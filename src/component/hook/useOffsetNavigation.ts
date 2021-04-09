import { Reducer, useEffect, useReducer } from "react";
import { useKeyDown } from "./useKeyDown";

interface OffsetState {
  offset: number;
  maximum: number;
}
interface OffsetAction {
  type: "increment" | "decrement" | "reset";
  maximum?: number;
}
const reducer = (state: OffsetState, action: OffsetAction) => {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        offset: Math.min(state.offset + 1, state.maximum - 1),
      };
    case "decrement":
      return { ...state, offset: Math.max(state.offset - 1, 0) };
    case "reset":
      return { offset: 0, maximum: action.maximum };
    default:
      throw new Error();
  }
};
export const useOffsetNavigation = (maxLenth: number) => {
  const [state, dispatch] = useReducer<Reducer<OffsetState, OffsetAction>>(
    reducer,
    { offset: 0, maximum: 0 }
  );
  useEffect(() => dispatch({ type: "reset", maximum: maxLenth }), [maxLenth]);
  useKeyDown(event => {
    if (event.key === "ArrowLeft") {
      dispatch({ type: "decrement" });
    }
    if (event.key === "ArrowRight") {
      dispatch({ type: "increment" });
    }
  });
  return state.offset;
};
