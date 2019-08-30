import axios from "../../utils/axios-base";
import * as types from "./types";
import * as dateFns from 'date-fns';

export const loading = () => {
	return {
		type: types.LOADING_SUBSCRIPTION
	};
};

export const getSubsSuccess = prodSubs => {
	return {
		type: types.GET_SUBS_SUCCESS, 
		prodSubs
	};
};


export const errorOccured = error => {
	return {
		type: types.ERROR_OCCURED,
		error
	};
};

export const getSubs = () => {
	return dispatch => {
		dispatch(loading());
		axios
			.get("/subs")
 			.then(res => {
				dispatch(getSubsSuccess(res.data));
			})
			.catch(err => dispatch(errorOccured(err.res.data)));
	};
};


export const getSingleSub = prodSubId => {
	return dispatch => {
		dispatch(loading());
		axios
			.get(`/subs/${prodSubId}`)
			.then(res => {	
				res.data.signUpDate = dateFns.format(res.data.signUpdate, 'DD-MM-YYYY')
				res.data.createdAt = dateFns.format(res.data.createdAt, 'DD-MM-YYYY')
				res.data.updatedAt = dateFns.format(res.data.updatedAt, 'DD-MM-YYYY')
				dispatch({ type: types.GET_SINGLE_SUB_SUCCESS, sub: res.data });
			})
			.catch(err => dispatch(errorOccured(err)));
	};
};
export const addSubInit = () => {
	return {
		type: types.ADD_SUB_INIT
	};
};

export const addSub = prodSubData => {
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
            .post("/subs", prodSubData, config)
			.then(res => {
				return dispatch({ type: types.ADD_SUB_SUCCESS });
			})
			.then(() => {
				dispatch(getSubs());
			})
			.catch(err => dispatch(errorOccured(err.response.data)));
			
			
	};
};
export const editSubInit = prodSubId => { 
	return (dispatch, getState) => {
		dispatch(loading());
			const config = {
			headers: {"Content-Type": "application/json"}
		};
		axios
			.get(`/subs/edit/${prodSubId}`,config)
			.then(res => {
					res.data.signUpDate = dateFns.format(res.data.signUpDate, 'YYYY-MM-DD')
					dispatch({ type: types.EDIT_SUB_INIT, prodSub: res.data });
				
			})
			.catch(err => dispatch(errorOccured(err.response.data)));
	};
};

export const editSubDone= () => {
	return {
		type: types.EDIT_SUB_DONE
	};
};

export const editSub = (prodSubData) => {
	return (dispatch, getState) => {
		dispatch(loading());
		const prodSubId = getState().prodSub.prodSub.prodSubId;

		const config = {
			headers: {"Content-Type": "application/json"}
		};
		axios
			.put(`subs/edit/${prodSubId}`, prodSubData, config)
			.then(res => {
				return dispatch({ type: types.EDIT_SUB_SUCCESS,prodSub: res.data });
			}).then(() => {
				dispatch(editSubDone());
			})
			.catch(err => dispatch(errorOccured(err.res.data)));
	};
};



export const deleteSubInit = () => {
	return {
		type: types.DELETE_SUB_INIT
	};
};

export const deleteSub = prodSubId => {
	return (dispatch) => {
		dispatch(loading());
		// const token = getState().auth.token;

		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		};
		axios
			.delete(`subs/del/${prodSubId}`, config)
			.then(res => {
				return dispatch({ type: types.DELETE_SUB_SUCCESS, prodSub:null });
			})
			.then(() => {
				dispatch(getSubs());
			})
			.catch(err => dispatch(errorOccured(err.response.data)));
	};
};
