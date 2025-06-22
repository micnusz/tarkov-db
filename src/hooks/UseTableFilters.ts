import React from "react";

type RangeFilterValue = { min: number | null; max: number | null };

type FilterValue = string | null | RangeFilterValue;

type FilterState = Record<string, FilterValue>;

type FilterAction =
  | { type: "SET_FILTER"; id: string; value: FilterValue }
  | { type: "RESET_ALL" };

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case "SET_FILTER":
      return { ...state, [action.id]: action.value };
    case "RESET_ALL":
      return Object.fromEntries(Object.keys(state).map((key) => [key, null]));
    default:
      return state;
  }
}

export function useTableFilters(filterIds: string[]) {
  const initialState: Record<string, FilterValue> = Object.fromEntries(
    filterIds.map((id) => [id, null])
  );

  const [state, dispatch] = React.useReducer(filterReducer, initialState);

  return { state, dispatch };
}
