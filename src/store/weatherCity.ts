import { RootState, InferActionsTypes } from './store';
import { ThunkAction } from 'redux-thunk';
import { FETCH_WEATHER_SUCCESS } from './type';
import fetchWeatherCity from '../api/fetchWeatherCityApi';
import { dateСonversion } from '../utilites/dateСonversion';

export type TemperatureChangeType = {
	temp_min: number
	temp_max: number
}

export type DailyWeatherType = {
	dt: undefined | string
	daytime: undefined | string
	temp_min: number
	temp_max: number
	temp_day: number
}

export type CurrentWeatherType = {
	success: boolean
	description: undefined | string
	temperature: undefined | number
	temperatureChange: undefined | TemperatureChangeType
	city: undefined | string
	country: undefined | string
	humidity: undefined | number
	pressure: undefined | number
	wind: undefined | number
	sunrise: undefined | string
	sunset: undefined | string
	daytime: undefined | string
	dt: undefined | number
	error: undefined | string
}

type IState = typeof initialState

type AllTypes = InferActionsTypes<typeof actions>

export type IThunk = ThunkAction<void, RootState, unknown, AllTypes>

const initialState = {
	daily: [] as DailyWeatherType[],
	current: {
		success: false as boolean,
		description: undefined as undefined | string,
		temperature: undefined as undefined | number,
		temperatureChange: undefined as undefined | TemperatureChangeType,
		city: undefined as undefined | string,
		country: undefined as undefined | string,
		humidity: undefined as  undefined | number,
		pressure: undefined as  undefined | number,
		wind: undefined as  undefined | number,
		sunrise: undefined as undefined | string,
		sunset: undefined as undefined | string,
		daytime: undefined as undefined | string,
		dt: undefined as undefined | number,
		error: undefined as undefined | string,
	}
}

const weatherCity = (state: IState = initialState, action: AllTypes): IState => {
	switch(action.type){
		case FETCH_WEATHER_SUCCESS:{
			return {
				...state,
				current: {...action.current},
				daily: [...state.daily, ...action.daily]
			}
		} 
		default: {
			return state
		}
	}
};

const actions = {
	fetchWeatherCitySuccess : (current: CurrentWeatherType, daily: Array<DailyWeatherType>) => ({
		type: FETCH_WEATHER_SUCCESS,
		current,
		daily
	} as const)
}

export const fetchGetWeatherCity = (city: string, country: string, lat: string, lon: string) : IThunk => async(dispatch) => {

	try{
		let result = await Promise.all([
			fetchWeatherCity.getWeatherCity(city, country),
			fetchWeatherCity.getDailyWeatherCity(lat, lon),
		]);

		let current = result[0];
		let daily = result[1].daily;

		let newCurrent = {
			success: true,
			description: current.weather[0].description,
			temperature: Math.round(current.main.temp),
			temperatureChange: {
				temp_min: Math.round(current.main.temp_min),
				temp_max: Math.round(current.main.temp_max)
			},
			city: current.name,
			country: current.sys.country,
			humidity: current.main.humidity,
			pressure: current.main.pressure,
			wind: current.wind.speed,
			sunrise: `${dateСonversion(current.sys.sunrise).hour}:${dateСonversion(current.sys.sunrise).minute}`,
			sunset: `${dateСonversion(current.sys.sunset).hour}:${dateСonversion(current.sys.sunset).minute}`,
			daytime: `${dateСonversion(current.dt).hour}:${dateСonversion(current.dt).minute}`,
			dt: current.dt,
			error: undefined
		}

		dispatch(actions.fetchWeatherCitySuccess(newCurrent, daily));
	}
	catch(e){
		console.log(e)
	}
}

export default weatherCity;

