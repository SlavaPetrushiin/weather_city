import React, { useEffect, useState } from 'react';
import WeatherParam from './WeatherParam';
import Background from './Background';
import Title from './Title';

export type ITemperatureChange = {
	temp_min: string
	temp_max: string
}

type IState = {
	success: boolean
	description: undefined | string
	temperature: undefined | string
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

const CardCity = () => {
	const [state, setState] = useState<IState>({
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
	})

	useEffect(() => {
		const dataWeather = async () => {
			const result = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=Minsk,Belarus&appid=${process.env.REACT_APP_NOT_SECRET_CODE}&units=metric`);
			const data = await result.json();

			const newData = {
				success: true,
				description: data.weather[0].description,
				temperature: data.main.temp,
				temperatureChange: {
					temp_min: data.main.temp_min,
					temp_max: data.main.temp_max
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

			if (!!data) {
				setState(newData);
			}
		}

		dataWeather();
	}, [])

	const dateСonversion = (value: any) => {
		let months = [
			'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
		]
		let days = [
			'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
		];

		let date = new Date(+value * 1000);
		let hour = date.getHours();
		let minute = date.getMinutes();
		let day = days[date.getDay()];
		let month = months[date.getMonth()];
		let year = date.getFullYear();

		console.log(day, month, hour, minute, year);

		return {day, month, year, hour, minute}
	}

	const renderWeatherParams = () => {
		let keys = (Object.keys(state) as Array<keyof IState>).map(key => key);
		let keysForRender = keys.filter((key) => key !== "success" && key !== "city" && key !== "country" && key !== "error" && key !== "dt");
		let resultParams = keysForRender.map(key => <WeatherParam key={key} name={key} description={state[key]} />);

		return resultParams;
	}

	return (
		<div className="container">
			<div className="weather">
				<Background />
				<div className="weather-info">
					<Title city={state.city} country={state.country} date={dateСonversion(state.dt)}/>
					<div className="weather-descriptions">
						{!!state.success && renderWeatherParams()}
					</div>
				</div>
			</div>
		</div>
	)
}

export default CardCity;
