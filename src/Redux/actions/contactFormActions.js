export const SET_TICKET_DATA  = 'SET_TICKET_DATA ';

export const setTicketData = (ticketData) => {
  return {
    type: SET_TICKET_DATA,
    payload: ticketData,
  };
};