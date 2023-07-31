import { combineReducers } from 'redux';
import { cityReducer } from './cityReducers'; 
import { destinationReducer } from './destinationReducer'; 
import { formReducer } from './searchFormReducer'; 
import {directionReducer} from "./directionReducer"
import {flightsReducer} from "./flightsReducer"
import { ticketReducer } from './ticketFormReducer';
import { flightReducer } from './flightReducer';

const rootReducer = combineReducers({
  destinations: destinationReducer,
  cities: cityReducer,
  form:formReducer,
  direction: directionReducer,
  flights : flightsReducer,
  ticket : ticketReducer,
  flight: flightReducer
});

export default rootReducer;