import { FindCityType } from './../api/fetchWeatherCityApi';
import { RootState, InferActionsTypes } from './store';
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
	lat?: number
	lon?: number
}

type IAllTypes = InferActionsTypes<typeof actions>;

export type IThunk = ThunkAction<void, RootState, unknown, IAllTypes>

type InitialStateType = typeof initialState

const initialState = {
	foundCities: [] as ICity[],
	favorites: [] as ICity[],
	error: false as boolean,
	message: "Enter the correct name" as string
};

const cities = (state: InitialStateType = initialState, action: IAllTypes): InitialStateType => {
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

export const actions = {
	citySelectedSuccess: (favorites: ICity[]) => ({type: CITY_SELECTED_SUCCESS, favorites} as const),
	fetchFindCitySuccess: (foundCities: ICity[]) => ({type: FETCH_CITY_SUCCESS, foundCities} as const),
	fetchFindCityError: () => ({type: FETCH_CITY_ERROR} as const),
	getLocalCitiesSuccess: (favorites: Array<ICity>) => ({type: GET_LOCAL_CITY_SUCCESS,favorites} as const)
}

function createArrCities<T extends Array<FindCityType>>(cities: T): Array<ICity>{
	return cities.map((city): ICity => {
		return { 
			city: city.name,
			country: city.sys.country,
			temperature: Math.round(city.main.temp),
			id: uuidv4(),
			lat: city.coord.lat,
			lon: city.coord.lon
		}
	})
}

export const findCity = (letters: string): IThunk => async (dispatch) => {
	try {
		let result = await fetchWeatherCity.findCity(letters);
		let cities = result.list;
		if(cities.length === 0) {
			dispatch(actions.fetchFindCityError());
			return
		}

		let citiesAndCountry = createArrCities(cities);

		dispatch(actions.fetchFindCitySuccess(citiesAndCountry))
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
		dispatch(actions.citySelectedSuccess(newFavoritesCities));
		storageApi.saveCity(newFavoritesCities);
	}
	catch (e) {
		console.log(e)
	}
}

export const getLocalFavoritesCities = (): IThunk => async (dispatch) => {
	try {
		let localFavoritesCities = await storageApi.getCities();
		dispatch(actions.getLocalCitiesSuccess(localFavoritesCities));
	}
	catch (e) {
		console.log(e)
	}
}

export const removeLocalFavoriteCity = (id: string): IThunk => async (dispatch, getState) => {
	try {
		let favoritesCities = getState().cities.favorites;
		let newFavoritesCities = favoritesCities.filter((favorite: ICity) => favorite.id !== id);
		dispatch(actions.citySelectedSuccess(newFavoritesCities));
		storageApi.removeCity(id);
	}
	catch (e) {
		console.log(e)
	}
}

export const updateTemperatureByReload = (): IThunk => async (dispatch) =>  {
	try{
		let favoritesCities = storageApi.getCities();
		let result = await Promise.all(favoritesCities.map((city: ICity) => fetchWeatherCity.getWeatherCity(city.city, city.country)));
		let cities = createArrCities(result as Array<FindCityType>);
		dispatch(actions.citySelectedSuccess(cities));
		storageApi.updateCites(cities);
	}
	catch(e){
		console.log(e)
	}
}

export default cities;
