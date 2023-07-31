import { SET_TICKET_DATA } from '../actions/contactFormActions';

const initialState = {
  ticketData: {
    contactMail: '',
    billType: '',
    billName: '',
    billSurname: '',
    billCitizen: '',
    gender1:'',
    customerName1:'',
    customerSurname1: '',
    customerBirtday1:'',
    customerCitizen1:'',
    gender2:'',
    customerName2:'',
    customerSurname2: '',
    customerBirtday2:'',
    customerCitizen2:'',
    gender3:'',
    customerName3:'',
    customerSurname3: '',
    customerBirtday3:'',
    customerCitizen3:'',
    gender4:'',
    customerName4:'',
    customerSurname4: '',
    customerBirtday4:'',
    customerCitizen4:'',

    
  },
};

export const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TICKET_DATA:
      return {
        ...state,
        ticketData: action.payload,
      };
    default:
      return state;
  }
};

