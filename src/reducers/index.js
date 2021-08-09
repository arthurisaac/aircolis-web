import {combineReducers} from "redux";
import loggedReducer from "./isLogged";

const allReducer = combineReducers({
    isLogged: loggedReducer
});

export default allReducer;