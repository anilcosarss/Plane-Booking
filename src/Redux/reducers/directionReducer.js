const initialState = {
    toAYT: false,
    toDUS: false,
  };
  
  export const directionReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_TO_AYT':
        return { ...state, toAYT: action.payload };
      case 'SET_TO_DUS':
        return { ...state, toDUS: action.payload };
      default:
        return state;
    }
  };
  
