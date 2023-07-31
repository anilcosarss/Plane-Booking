import search from "../../datas/search.json";

const INITIAL_STATE = {
  flights: search,
};

export const flightsReducer = (state = INITIAL_STATE, action) => {
  return state;
};