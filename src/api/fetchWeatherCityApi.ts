import axios from "axios"

const fetchWeatherCity = {
	getWeatherCity(city: string, country: string){
		return axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}A&appid=${process.env.REACT_APP_NOT_SECRET_CODE}&units=metric`)
	},
	findCity(letters: string){
		return axios.get(`http://api.openweathermap.org/data/2.5/find?q=${letters}&appid=${process.env.REACT_APP_NOT_SECRET_CODE}&units=metric`)
	}
}

export default fetchWeatherCity;