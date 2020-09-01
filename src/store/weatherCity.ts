import { RootState } from './store';
import { ThunkAction } from 'redux-thunk';
import { FETCH_WEATHER_SUCCESS } from './type';
import fetchWeatherCity from '../api/fetchWeatherCityApi';
import { dateСonversion } from '../utilites/dateСonversion';

export type ITemperatureChange = {
	temp_min: number
	temp_max: number
}

export type IDailyWeather = {
	dt: undefined | string
	daytime: undefined | string
	temp_min: number
	temp_max: number
	temp_day: number
}

export type ICurrentWeather = {
	success: boolean
	description: undefined | string
	temperature: undefined | number
	temperatureChange: undefined | ITemperatureChange
	city: undefined | string
	country: undefined | string
	humidity: undefined | string
	pressure: undefined | string
	wind: undefined | string
	sunrise: undefined | string
	sunset: undefined | string
	daytime: undefined | string
	dt: undefined | string
	error: undefined | string
}

type IState = {
	daily: Array<IDailyWeather>
	current: ICurrentWeather
}

const initialState: IState = {
	daily: [],
	current: {
		success: false,
		description: undefined,
		temperature: undefined,
		temperatureChange: undefined,
		city: undefined,
		country: undefined,
		humidity: undefined,
		pressure: undefined,
		wind: undefined,
		sunrise: undefined,
		sunset: undefined,
		daytime: undefined,
		dt: undefined,
		error: undefined,
	}
}

type IFetchWeatherSuccess = {
	type: typeof FETCH_WEATHER_SUCCESS
	current: ICurrentWeather
	daily: Array<IDailyWeather>
}

type IAllTypes = IFetchWeatherSuccess

export type IThunk = ThunkAction<void, RootState, unknown, IAllTypes>

const weatherCity = (state: IState = initialState, action: IAllTypes): IState => {
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

const fetchWeatherCitySuccess = (current: ICurrentWeather, daily: Array<IDailyWeather>): IFetchWeatherSuccess => {
	return {
		type: FETCH_WEATHER_SUCCESS,
		current,
		daily
	}
}

export const fetchGetWeatherCity = (city: string, country: string, lat: string, lon: string) : IThunk => async(dispatch) => {

	try{
		let result = await Promise.all([
			fetchWeatherCity.getWeatherCity(city, country),
			fetchWeatherCity.getDailyWeatherCity(lat, lon),
		]);

		let current = result[0].data;
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

		dispatch(fetchWeatherCitySuccess(newCurrent, daily));
	}
	catch(e){
		console.log(e)
	}
}

export default weatherCity;