import axios from "../../utils/axios-base";
import * as types from "./types";
import * as dateFns from 'date-fns';

export const loading = () => {
	return {
		type: types.LOADING_PAYMENT
	};
};

export const getPaymentsSuccess = payments => {
	return {
		type: types.GET_PAYMENTS_SUCCESS, 
		payments
	};
};


export const errorOccured = error => {
	return {
		type: types.PAYMENT_ERROR_OCCURED,
		error
	};
};

export const getPayments = () => {
	return dispatch => {
		dispatch(loading());
		axios
			.get("/payment")
 			.then(res => {
				dispatch(getPaymentsSuccess(res.data));
			})
			.catch(err => dispatch(errorOccured(err.res.data)));
	};
};


export const getSinglePayment = paymentId => {
	return dispatch => {
		dispatch(loading());
		axios
			.get(`/payment/${paymentId}`)
			.then(res => {	
				res.data.paymentDate = dateFns.format(res.data.signUpdate, 'DD-MM-YYYY')
				res.data.createdAt = dateFns.format(res.data.createdAt, 'DD-MM-YYYY')
				res.data.updatedAt = dateFns.format(res.data.updatedAt, 'DD-MM-YYYY')
				dispatch({ type: types.GET_SINGLE_PAYMENT_SUCCESS, payment: res.data });
			})
			.catch(err => dispatch(errorOccured(err)));
	};
};
export const addPaymentInit = () => {
	return {
		type: types.ADD_PAYMENT_INIT
	};
};

export const addPayment = paymentData => {
	return (dispatch, getState) => {
		dispatch(loading());
		const token = getState().auth.token;

		// Headers
		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		};

		// If token, add to headers
		if (token) {
			config.headers["x-access-token"] = token;
		}
		axios
            .post("/payment", paymentData, config)
			.then(res => {
				return dispatch({ type: types.ADD_PAYMENT_SUCCESS });
			})
			.then(() => {
				dispatch(addPaymentInit());
			})
			.catch(err => dispatch(errorOccured(err.response.data)));
			
			
	};
};