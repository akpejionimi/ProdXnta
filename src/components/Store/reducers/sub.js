import * as types from "../actions/types";

const initialState = {
	prodSubs: [],
	prodSub: null,
	isLoading: false,
	prodSubCreated: false,
	prodSubDeleted: false,
	prodSubUpdated:false,
	error: null
};

const reducer = (state = initialState, action) => {
	
	switch (action.type) {
		case types.GET_SUBS_SUCCESS:
			return {
				...state,
				prodSubs: action.prodSubs,
				isLoading: false
			};
		case types.GET_SINGLE_SUB_SUCCESS:
			return {
				...state,
				prodSub: action.prodSub,
				isLoading: false
			};
		case types.ADD_SUB_INIT:
			return {
				...state,
				prodSubCreated: false,
				error: null
			};
		case types.ADD_SUB_SUCCESS:
			return {
				...state,
				isLoading: false,
				prodSubCreated: true,
				error: null
			};
			case types.EDIT_SUB_INIT:
			return {
				...state,
				isLoading: false,
				prodSubUpdated: false,
				prodSub: action.prodSub,
				error: null
			};
		case types.EDIT_SUB_SUCCESS:
			return {
				...state,
				isLoading: false,
				prodSubUpdated: true,
				error: null
			};
			case types.EDIT_SUB_DONE:
			return {
				...state,
				// prodSubUpdated: false,
				error: null
			};
		case types.DELETE_SUB_INIT:
			return {
				...state,
				prodSubDeleted: false,
				error: null
			};
		case types.DELETE_SUB_SUCCESS:
			return {
				...state,
				isLoading: false,
				prodSubDeleted: true,
				error: null
			};
		case types.LOADING_SUBSCRIPTION:
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