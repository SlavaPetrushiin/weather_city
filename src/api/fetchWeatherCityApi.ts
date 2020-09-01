import axios from "axios"
import { IDailyWeather } from "../store/weatherCity";

const instance = axios.create({
	baseURL: "http://api.openweathermap.org/data/2.5"
});

const fetchWeatherCity = {
	getWeatherCity(city: string, country: string){
		return instance.get(`/weather?q=${city},${country}&appid=${process.env.REACT_APP_NOT_SECRET_CODE}&units=metric`)
	},
	getDailyWeatherCity(lat: string, lon: string){
		return instance.get<{daily: Array<IDailyWeather>}>(`onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,current&appid=${process.env.REACT_APP_NOT_SECRET_CODE}`).then(r => r.data)
	},
	findCity(letters: string){
		return instance.get(`/find?q=${letters}&appid=${process.env.REACT_APP_NOT_SECRET_CODE}&units=metric`)
	}
}

export default fetchWeatherCity;