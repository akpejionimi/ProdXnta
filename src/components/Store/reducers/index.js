import { combineReducers} from "redux";

import authreducer from "./auth";
import customerReducer from "./customer";
import staffReducer from "./staffReducer";
import savingsProductReducer from "./savingsProduct";
import subsciptionReducer from "./sub";
import operatorReducer from "./operator";
import paymentReducer from "./payment";



const rootReducer = combineReducers({
    auth: authreducer,
    customer : customerReducer,
    staff: staffReducer,
    savingsProduct: savingsProductReducer,
    prodSub: subsciptionReducer,
    operator: operatorReducer,
    payment: paymentReducer

});


export default rootReducer;