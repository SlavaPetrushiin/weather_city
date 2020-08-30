import { useDispatch } from 'react-redux';
import { RootState } from './store';
import { ThunkAction } from 'redux-thunk';
import { FETCH_CITY_SUCCESS, CITY_SELECTED_SUCCESS } from "./type"
import fetchWeatherCity from "../api/fetchWeatherCity"
import { favoriteCitySort } from '../utilites/favoriteCitySort';

export type ICity = {
	city: string
	country: string
	temperature: number
}

type IFetchCitySuccess = {
	type: typeof FETCH_CITY_SUCCESS
	cities: Array<ICity> | []
}

type ICitySelectedSuccess = {
	type: typeof CITY_SELECTED_SUCCESS
	favourites: Array<ICity>
}

type IInitialState = {
	cities: Array<ICity>
	favourites: Array<ICity>
}

const initialState: IInitialState = {
	cities: [],
	favourites: []
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
				favourites: [...action.favourites],
				cities: []
			}
		}
		default: {
			return state
		}
	}
};

type IAllTypes = IFetchCitySuccess | ICitySelectedSuccess

export type IThunk = ThunkAction<void, RootState, unknown, IAllTypes>

const citySelectedSuccess = (favourites: Array<ICity>): ICitySelectedSuccess => {
	return {
		type: CITY_SELECTED_SUCCESS,
		favourites
	}
}

const fetchFindCitySuccess = (cities: any): IFetchCitySuccess => {
	return {
		type: FETCH_CITY_SUCCESS,
		cities
	}
}

export const findCity = (letters: string): IThunk => async (dispatch) => {
	try {
		let result = await fetchWeatherCity.findCity(letters);
		let cities = result.data.list;
		let citiesAndCountry = cities.map((city: any) => {
			return { city: city.name, country: city.sys.country, temperature: Math.round(city.main.temp)}
		})

		dispatch(fetchFindCitySuccess(citiesAndCountry))
	}
	catch (e) {
		console.log(e)
	}
}

export const updateFavouritesCyties = (city: string): IThunk => async (dispatch, getState) => {
	try {
		let flag = false;
		let findCities = getState().cities.cities;
		let favoritesCities = getState().cities.favourites;
		let favoriteCity = city.split(',');
		let favorite = findCities.filter((c: ICity) => {
			if (c.city === favoriteCity[0].trim() && c.country === favoriteCity[1].trim() && !flag) {
				flag = true
				return c
			}
		})

		let newFavoritesCities = favoritesCities.concat(favorite).sort(favoriteCitySort);
		dispatch(citySelectedSuccess(newFavoritesCities));
	}
	catch (e) {
		console.log(e)
	}
}

export default cities;


