import axios from "axios"
import { DailyWeatherType } from "../store/weatherCity";

const instance = axios.create({
	baseURL: "http://api.openweathermap.org/data/2.5"
});

type MainType = {
	temp: number
	feels_like: number
	temp_min: number
	temp_max: number
	pressure: number
	humidity: number
}

type WeatherType = {
	description: string
	icon: string
	id: number
	main: string
}

type SysType = {
	temp: number
	feels_like: number
	temp_min: number
	temp_max: number
	pressure: number
	country: string
	sunrise: number
	sunset: number
}

type WindType = {
	speed: number
	deg: number
}

export type FindCityType = {
	clouds: { all: number }
	coord: { lat: number, lon: number }
	dt: number
	main: MainType
	name: string
	sys: SysType
	weather: Array<WeatherType>
	wind: WindType
}

export type getWeatherCityType = {
	clouds: {all: number}
	coord: {lon: number, lat: number}
	dt: number
	main: MainType
	name: string
	sys: SysType
	weather: Array<WeatherType>
	wind: WindType
}

const fetchWeatherCity = {
	getWeatherCity(city: string, country: string) {
		return instance.get<getWeatherCityType>(`/weather?q=${city},${country}&appid=${process.env.REACT_APP_NOT_SECRET_CODE}&units=metric`)
		.then(r => r.data)
	},
	getDailyWeatherCity(lat: string, lon: string) {
		return instance.get<{ daily: Array<DailyWeatherType> }>(`onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,current&appid=${process.env.REACT_APP_NOT_SECRET_CODE}`).then(r => r.data)
	},
	findCity(letters: string) {
		return instance.get<{list: Array<FindCityType>}>(`/find?q=${letters}&appid=${process.env.REACT_APP_NOT_SECRET_CODE}&units=metric`).then(r => r.data)
	}
}

export default fetchWeatherCity;