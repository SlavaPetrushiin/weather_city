import { RootState } from './store';
import { ThunkAction } from 'redux-thunk';
import { FETCH_CITY_SUCCESS } from "./type"
import fetchWeatherCity from "../api/fetchWeatherCity"

type ICities = {
	city: string
	country: string
}

type IFetchCitySuccess = {
	type: typeof FETCH_CITY_SUCCESS
	cities: Array<ICities> | []
}

const fetchFindCitySuccess = (cities: any): IFetchCitySuccess => {
	return {
		type: FETCH_CITY_SUCCESS,
		cities
	}
}

const initialState: Array<ICities> = [];

const cities = (state: any = initialState, action: IAllTypes): Array<ICities> => {
	switch(action.type){
		case FETCH_CITY_SUCCESS:{
			return {
				...state,
				...action.cities
			}
		} 
		default: {
			return state
		}
	}
};


type IAllTypes = IFetchCitySuccess
export type IThunk = ThunkAction<void, RootState, unknown, IAllTypes>

export const findCity = (letters: string): IThunk => async (dispatch) => {
	try{
		const result = await fetchWeatherCity.findCity(letters);
		const cities = result.data.list;
		const citiesAndCountry = cities.map((city: any) => {
			return {city: city.name, country: city.sys.country}
		})
		dispatch(fetchFindCitySuccess(citiesAndCountry))
		debugger
	} 
	catch(e){

	}
}

export default cities;