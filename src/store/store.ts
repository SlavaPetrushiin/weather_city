import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk, {ThunkMiddleware} from "redux-thunk";
import weatherCity from "./weatherCity";
import cities from "./cities";

const rootReducer = combineReducers({
	card : weatherCity,
	cities: cities
})

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk as ThunkMiddleware<RootState, any>));

export default store;