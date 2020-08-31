import axios from "axios"

const instance = axios.create({
	baseURL: "http://api.openweathermap.org/data/2.5"
});

const fetchWeatherCity = {
	getWeatherCity(city: string, country: string){
		return instance.get(`/weather?q=${city},${country}A&appid=${process.env.REACT_APP_NOT_SECRET_CODE}&units=metric`)
	},
	findCity(letters: string){
		return instance.get(`/find?q=${letters}&appid=${process.env.REACT_APP_NOT_SECRET_CODE}&units=metric`)
	}
}

export default fetchWeatherCity;