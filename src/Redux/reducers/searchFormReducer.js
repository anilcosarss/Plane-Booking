import { SET_FORM_DATA } from '../actions/searchFormActions';

const initialState = {
  formData: {
    fromCity: '',
    toCity: '',
    departureDate: '',
    returnDate: '',
    numberOfPassengers: "",
    tripType: '',
  },
};

export const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FORM_DATA:
      return {
        ...state,
        formData: action.payload,
      };
    default:
      return state;
  }
};

