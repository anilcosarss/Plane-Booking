export const SET_SELECTED_FLY = 'SET_SELECTED_FLY';

export const setSelectedFly = (selectedFly) => {
  return {
    type: SET_SELECTED_FLY,
    payload: selectedFly
  };
};