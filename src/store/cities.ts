import { RootState } from './store';
import { v4 as uuidv4 } from 'uuid';
import { ThunkAction } from 'redux-thunk';
import { FETCH_CITY_SUCCESS, CITY_SELECTED_SUCCESS, GET_LOCAL_CITY_SUCCESS } from "./type";
import fetchWeatherCity from '../api/fetchWeatherCityApi';
import { favoriteCitySort } from '../utilites/favoriteCitySort';
import storageApi from '../api/storageApi';

export type ICity = {
	city: string
	country: string
	temperature: number
	id: string
}

type IFetchCitySuccess = {
	type: typeof FETCH_CITY_SUCCESS
	cities: Array<ICity> | []
}

type ICitySelectedSuccess = {
	type: typeof CITY_SELECTED_SUCCESS
	favorites: Array<ICity>
}

type IGetLocalCitiesSuccess = {
	type: typeof GET_LOCAL_CITY_SUCCESS
	favorites: Array<ICity>
}

type IInitialState = {
	cities: Array<ICity>
	favorites: Array<ICity>
}

type IAllTypes = 
	IFetchCitySuccess 
	| ICitySelectedSuccess
	| IGetLocalCitiesSuccess

export type IThunk = ThunkAction<void, RootState, unknown, IAllTypes>

const initialState: IInitialState = {
	cities: [],
	favorites: []
};

const cities = (state: IInitialState = initialState, action: IAllTypes): IInitialState => {
	switch (action.type) {
		case FETCH_CITY_SUCCESS: {
			return {
				...state,
				cities: [...action.cities]
			}
		}
		case CITY_SELECTED_SUCCESS: {
			return {
				...state,
				favorites: [...action.favorites],
				cities: []
			}
		}
		case GET_LOCAL_CITY_SUCCESS: {
			return {
				...state,
				favorites: [...action.favorites],
				cities: []
			}
		}
		default: {
			return state
		}
	}
};

const citySelectedSuccess = (favorites: Array<ICity>): ICitySelectedSuccess => {
	return {
		type: CITY_SELECTED_SUCCESS,
		favorites
	}
}

const fetchFindCitySuccess = (cities: any): IFetchCitySuccess => {
	return {
		type: FETCH_CITY_SUCCESS,
		cities
	}
}

const getLocalCitiesSuccess = (favorites: Array<ICity>): IGetLocalCitiesSuccess => {
	return {
		type: GET_LOCAL_CITY_SUCCESS,
		favorites
	}
}

export const findCity = (letters: string): IThunk => async (dispatch) => {
	try {
		let result = await fetchWeatherCity.findCity(letters);
		let cities = result.data.list;
		let citiesAndCountry = cities.map((city: any): ICity => {
			return { 
				city: city.name,
				country: city.sys.country,
				temperature: Math.round(city.main.temp),
				id: uuidv4()
			}
		})

		dispatch(fetchFindCitySuccess(citiesAndCountry))
	}
	catch (e) {
		console.log(e)
	}
}

export const updateFavoritesCities = (city: string): IThunk => async (dispatch, getState) => {
	try {
		let flag = false;
		let findCities = getState().cities.cities;
		let favoritesCities = getState().cities.favorites;
		let favoriteCity = city.split(',');
		let favorite = findCities.filter((c: ICity) => {
			if (c.city === favoriteCity[0].trim() && c.country === favoriteCity[1].trim() && !flag) {
				flag = true
				return c
			}
		})

		let newFavoritesCities = favoritesCities.concat(favorite).sort(favoriteCitySort);
		dispatch(citySelectedSuccess(newFavoritesCities));
		storageApi.saveFavorites(favorite[0]);
	}
	catch (e) {
		console.log(e)
	}
}

export const getLocalFavoritesCities = (): IThunk => async (dispatch) => {
	try {
		let localFavoritesCities = await storageApi.getFavorites();
		dispatch(getLocalCitiesSuccess(localFavoritesCities));
	}
	catch (e) {
		console.log(e)
	}
}

export const removeLocalFavoriteCity = (id: string): IThunk => async (dispatch, getState) => {
	try {
		let favoritesCities = getState().cities.favorites;
		let newFavoritesCities = favoritesCities.filter((favorite: ICity) => favorite.id !== id);
		dispatch(citySelectedSuccess(newFavoritesCities));
		storageApi.removeImage(id);
	}
	catch (e) {
		console.log(e)
	}
}

export default cities;


