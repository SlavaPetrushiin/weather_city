import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk, {ThunkMiddleware} from "redux-thunk";
import weatherCity from "./weatherCity";
import cities from "./cities";

const rootReducer = combineReducers({
	card : weatherCity,
	cities: cities
})

export type RootState = ReturnType<typeof rootReducer>;

type PropertyTypes<T> = T extends {[key: string]: infer U} ? U : never 
export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any} > = ReturnType<PropertyTypes<T>>

const store = createStore(rootReducer, applyMiddleware(thunk as ThunkMiddleware<RootState, any>));

export default store;