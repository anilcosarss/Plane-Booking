
import { SET_SELECTED_FROM, SET_SELECTED_TO } from '../actions/cityActions';

const initialState = {
    selectedFrom: '',
    selectedTo: '',
  };
  
  export const cityReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_SELECTED_FROM:
        return {
          ...state,
          selectedFrom: action.payload,
        };
      case SET_SELECTED_TO:
        return {
          ...state,
          selectedTo: action.payload,
        };
      default:
        return state;
    }
  };