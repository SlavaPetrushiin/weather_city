import { RootState } from './store';
import { ThunkAction } from 'redux-thunk';
import { FETCH_WEATHER_SUCCESS } from './type';
import fetchWeatherCity from '../api/fetchWeatherCityApi';
import { dateСonversion } from '../utilites/dateСonversion';

export type ITemperatureChange = {
	temp_min: number
	temp_max: number
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



export const fetchGetWeatherCity = (city: string, country: string): IThunk => async(dispatch) => {
	try{
		let result = await fetchWeatherCity.getWeatherCity(city, country);
		let data = result.data;

		let newData = {
			success: true,
			description: data.weather[0].description,
			temperature: Math.round(data.main.temp),
			temperatureChange: {
				temp_min: Math.round(data.main.temp_min),
				temp_max: Math.round(data.main.temp_max)
			},
			city: data.name,
			country: data.sys.country,
			humidity: data.main.humidity,
			pressure: data.main.pressure,
			wind: data.wind.speed,
			sunrise: `${dateСonversion(data.sys.sunrise).hour}:${dateСonversion(data.sys.sunrise).minute}`,
			sunset: `${dateСonversion(data.sys.sunset).hour}:${dateСonversion(data.sys.sunset).minute}`,
			daytime: `${dateСonversion(data.dt).hour}:${dateСonversion(data.dt).minute}`,
			dt: data.dt,
			error: undefined
		}

		dispatch(fetchWeatherCitySuccess(newData));
	}
	catch(e){

	}
}




export default weatherCity;