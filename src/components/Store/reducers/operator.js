import * as types from "../actions/types";

const initialState = {
	operators: [],
	operator: null,
	isLoading: false,
	operatorCreated: false,
	operatorDeleted: false,
	operatorUpdated:false,
	error: null
};

const reducer = (state = initialState, action) => {
	
	switch (action.type) {
		case types.GET_OPERATORS_SUCCESS:
			return {
				...state,
				operators: action.operators,
				isLoading: false
			};
		case types.GET_SINGLE_OPERATOR_SUCCESS:
			return {
				...state,
				operator: action.operator,
				isLoading: false
			};
		case types.ADD_OPERATOR_INIT:
			return {
				...state,
				operatorCreated: false,
				error: null
			};
		case types.ADD_OPERATOR_SUCCESS:
			return {
				...state,
				isLoading: false,
				operatorCreated: true,
				error: null
			};
			case types.EDIT_OPERATOR_INIT:
			return {
				...state,
				isLoading: false,
				operatorUpdated: false,
				operator: action.operator,
				error: null
			};
		case types.EDIT_OPERATOR_SUCCESS:
			return {
				...state,
				isLoading: false,
				operatorUpdated: true,
				error: null
			};
			case types.EDIT_OPERATOR_DONE:
			return {
				...state,
				// operatorUpdated: false,
				error: null
			};
		case types.DELETE_OPERATOR_INIT:
			return {
				...state,
				operatorDeleted: false,
				error: null
			};
		case types.DELETE_OPERATOR_SUCCESS:
			return {
				...state,
				isLoading: false,
				operatorDeleted: true,
				error: null
			};
		case types.LOADING_OPERATOR:
			return {
				...state,
				isLoading: true
			};
		case types.OPERATOR_ERROR_OCCURED:
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