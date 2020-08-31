import { RootState } from './store';
import { v4 as uuidv4 } from 'uuid';
import { ThunkAction } from 'redux-thunk';
import { FETCH_CITY_SUCCESS, CITY_SELECTED_SUCCESS, GET_LOCAL_CITY_SUCCESS, FETCH_CITY_ERROR } from "./type";
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
	foundCities: Array<ICity> | []
}

type IFetchCityError = {
	type: typeof FETCH_CITY_ERROR
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
	foundCities: Array<ICity>
	favorites: Array<ICity>
	error: boolean
	message: string
}

type IAllTypes = 
	IFetchCitySuccess
	| IFetchCityError
	| ICitySelectedSuccess
	| IGetLocalCitiesSuccess

export type IThunk = ThunkAction<void, RootState, unknown, IAllTypes>

const initialState: IInitialState = {
	foundCities: [],
	favorites: [],
	error: false,
	message: "Enter the correct name"
};

const cities = (state: IInitialState = initialState, action: IAllTypes): IInitialState => {
	switch (action.type) {
		case FETCH_CITY_SUCCESS: {
			return {
				...state,
				error: false,
				foundCities: [...action.foundCities]
			}
		}
		case FETCH_CITY_ERROR: {
			return {
				...state,
				error: true,
			}
		}
		case CITY_SELECTED_SUCCESS: {
			return {
				...state,
				favorites: [...action.favorites],
				foundCities: []
			}
		}
		case GET_LOCAL_CITY_SUCCESS: {
			return {
				...state,
				favorites: [...action.favorites],
				foundCities: []
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

const fetchFindCitySuccess = (foundCities: Array<ICity>): IFetchCitySuccess => {
	return {
		type: FETCH_CITY_SUCCESS,
		foundCities
	}
}

const fetchFindCityError = (): IFetchCityError => {
	return {
		type: FETCH_CITY_ERROR,
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
		if(cities.length === 0) {
			dispatch(fetchFindCityError());
			return
		}

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
		let findCities = getState().cities.foundCities;
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
		storageApi.saveFavorites(newFavoritesCities);
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


