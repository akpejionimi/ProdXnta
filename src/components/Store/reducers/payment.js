import * as types from "../actions/types";

const initialState = {
	payments: [],
	payment: null,
	isLoading: false,
	paymentCreated: false,
	error: null
};

const reducer = (state = initialState, action) => {
	
	switch (action.type) {
		case types.GET_PAYMENTS_SUCCESS:
			return {
				...state,
				payments: action.payments,
				isLoading: false
			};
		case types.GET_SINGLE_PAYMENT_SUCCESS:
			return {
				...state,
				payment: action.payment,
				isLoading: false
			};
		case types.ADD_PAYMENT_INIT:
			return {
				...state,
				paymentCreated: false,
				error: null
			};
		case types.ADD_PAYMENT_SUCCESS:
			return {
				...state,
				isLoading: false,
				paymentCreated: true,
				error: null
			};
		case types.LOADING_PAYMENT:
			return {
				...state,
				isLoading: true
			};
		case types.ERROR_OCCURED:
			return {
				...state,
				isLoading: false,
				error: action.error
			};
		default:
			return state;
	}
};

export default reducer;