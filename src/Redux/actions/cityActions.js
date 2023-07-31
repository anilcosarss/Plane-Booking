export const SET_SELECTED_FROM = 'SET_SELECTED_FROM';
export const SET_SELECTED_TO = 'SET_SELECTED_TO';

export const setSelectedFrom = (selectedFrom) => {
  return {
    type: SET_SELECTED_FROM,
    payload: selectedFrom,
  };
};

export const setSelectedTo = (selectedTo) => {
  return {
    type: SET_SELECTED_TO,
    payload: selectedTo,
  };
};