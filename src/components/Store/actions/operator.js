import axios from "../../utils/axios-base";
import * as types from "./types";
// import * as dateFns from 'date-fns';

export const OperatorLoading = () => {
	return {
		type: types.LOADING_OPERATOR
	};
};

export const getOperatorSuccess = operators => {
	return {
		type: types.GET_OPERATORS_SUCCESS, 
		operators
	};
};


export const operatorErrorOccured = error => {
	return {
		type: types.OPERATOR_ERROR_OCCURED,
		error
	};
};

export const getOperators = () => {
	return dispatch => {
		dispatch(OperatorLoading());
		axios
			.get("/operator")
 			.then(res => {
				dispatch(getOperatorSuccess(res.data));
			})
			.catch(err => dispatch(operatorErrorOccured(err.res.data)));
	};
};


// export const getSingleSub = prodSubId => {
// 	return dispatch => {
// 		dispatch(loading());
// 		axios
// 			.get(`/subs/${prodSubId}`)
// 			.then(res => {	
// 				res.data.signUpDate = dateFns.format(res.data.signUpdate, 'DD-MM-YYYY')
// 				res.data.createdAt = dateFns.format(res.data.createdAt, 'DD-MM-YYYY')
// 				res.data.updatedAt = dateFns.format(res.data.updatedAt, 'DD-MM-YYYY')
// 				dispatch({ type: types.GET_SINGLE_SUB_SUCCESS, sub: res.data });
// 			})
// 			.catch(err => dispatch(errorOccured(err)));
// 	};
// };

export const addOperatorInit = () => {
	return {
		type: types.ADD_OPERATOR_INIT
	};
};

export const addOperator = operatorData => {
	return (dispatch, getState) => {
		dispatch(OperatorLoading());
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
            .post("/operator", operatorData, config)
			.then(res => {
				return dispatch({ type: types.ADD_OPERATOR_SUCCESS });
			})
			.then(() => {
				dispatch(addOperatorInit());
			})
			.catch(err => dispatch(operatorErrorOccured(err.response.data)));
			
			
	};
};
// export const editSubInit = prodSubId => { 
// 	return (dispatch, getState) => {
// 		dispatch(loading());
// 			const config = {
// 			headers: {"Content-Type": "application/json"}
// 		};
// 		axios
// 			.get(`/subs/edit/${prodSubId}`,config)
// 			.then(res => {
// 					res.data.signUpDate = dateFns.format(res.data.signUpDate, 'YYYY-MM-DD')
// 					dispatch({ type: types.EDIT_SUB_INIT, prodSub: res.data });
				
// 			})
// 			.catch(err => dispatch(errorOccured(err.response.data)));
// 	};
// };

// export const editSubDone= () => {
// 	return {
// 		type: types.EDIT_SUB_DONE
// 	};
// };

// export const editSub = (prodSubData) => {
// 	return (dispatch, getState) => {
// 		dispatch(loading());
// 		const prodSubId = getState().prodSub.prodSub.prodSubId;

// 		const config = {
// 			headers: {"Content-Type": "application/json"}
// 		};
// 		axios
// 			.put(`subs/edit/${prodSubId}`, prodSubData, config)
// 			.then(res => {
// 				return dispatch({ type: types.EDIT_SUB_SUCCESS,prodSub: res.data });
// 			}).then(() => {
// 				dispatch(editSubDone());
// 			})
// 			.catch(err => dispatch(errorOccured(err.res.data)));
// 	};
// };



// export const deleteSubInit = () => {
// 	return {
// 		type: types.DELETE_SUB_INIT
// 	};
// };

// export const deleteSub = prodSubId => {
// 	return (dispatch) => {
// 		dispatch(loading());
// 		// const token = getState().auth.token;

// 		const config = {
// 			headers: {
// 				"Content-Type": "application/json"
// 			}
// 		};
// 		axios
// 			.delete(`subs/del/${prodSubId}`, config)
// 			.then(res => {
// 				return dispatch({ type: types.DELETE_SUB_SUCCESS, prodSub:null });
// 			})
// 			.then(() => {
// 				dispatch(getSubs());
// 			})
// 			.catch(err => dispatch(errorOccured(err.response.data)));
// 	};
// };
