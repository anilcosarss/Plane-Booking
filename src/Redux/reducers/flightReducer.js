import { SET_SELECTED_FLY } from '../actions/flightActions';

const initialState = {
  selectedFly: {} 
};

export const flightReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_FLY:
      return {
        ...state,
        selectedFly: action.payload
      };
    default:
      return state;
  }
};