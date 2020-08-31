import { RootState } from './store';
import { ThunkAction } from 'redux-thunk';
import { FETCH_WEATHER_SUCCESS } from './type';
import fetchWeatherCity from '../api/fetchWeatherCityApi';
import { dateСonversion } from '../utilites/dateСonversion';

export type ITemperatureChange = {
	temp_min: number
	temp_max: number
}

export type IDaily = {

}

export type IStateWeather = {
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

const initialState: IStateWeather = {
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

type IFetchWeatherSuccess = {
	type: typeof FETCH_WEATHER_SUCCESS
	weather: IStateWeather
}

type IAllTypes = IFetchWeatherSuccess

export type IThunk = ThunkAction<void, RootState, unknown, IAllTypes>

const weatherCity = (state: IStateWeather = initialState, action: IAllTypes): IStateWeather => {
	switch(action.type){
		case FETCH_WEATHER_SUCCESS:{
			return {
				...state,
				...action.weather
			}
		} 
		default: {
			return state
		}
	}
};

const fetchWeatherCitySuccess = (data: IStateWeather): IFetchWeatherSuccess => {
	return {
		type: FETCH_WEATHER_SUCCESS,
		weather: data
	}
}

export const fetchGetWeatherCity = (city: string, country: string, lat: string, lon: string) : IThunk => async(dispatch) => {
	try{
		let result = await Promise.all([
			fetchWeatherCity.getWeatherCity(city, country),
			fetchWeatherCity.getDailyWeatherCity(lat, lon),
		]);

		let current = result[0].data;
		let daily = result[1].data;

		debugger

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

		dispatch(fetchWeatherCitySuccess(newCurrent));
	}
	catch(e){
		console.log(e)
	}
}

export default weatherCity;