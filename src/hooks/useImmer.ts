import { useState, useCallback } from "react";
import produce from "immer";

type ImmerProduce<S> = (state: S) => S | void;

function isProduce<S>(value: S | ImmerProduce<S>): value is ImmerProduce<S> {
  return typeof value === "function";
}

const useImmer = <S>(
  initialState: S | (() => S)
): [state: S, next: (state: S | ImmerProduce<S>) => void] => {
  const [state, setState] = useState(initialState);

  const pruduceState = useCallback((next: S | ImmerProduce<S>) => {
    if (isProduce(next)) {
      return setState((state) => produce(state, next));
    }
    return setState(next);
  }, []);

  return [state, pruduceState];
};

export default useImmer;
