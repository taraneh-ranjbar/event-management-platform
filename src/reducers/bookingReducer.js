export const initialState = {
  selectedTicket: null,
  quantity: 1,
};

export function bookingReducer(state, action) {
  switch (action.type) {
    case "SELECT_TICKET":
      return {
        ...state,
        selectedTicket: action.payload,
      };

    case "INCREASE_QUANTITY":
      return {
        ...state,
        quantity: state.quantity + 1,
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        quantity:
          state.quantity > 1
            ? state.quantity - 1
            : 1,
      };

    default:
      return state;
  }
}