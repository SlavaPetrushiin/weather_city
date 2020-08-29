import React, { useEffect, useState } from 'react';
import WeatherParam from './WeatherParam';
import Background from '../Background';
import Title from './Title';
import { dateСonversion } from '../../utilites/dateСonversion';

export type ITemperatureChange = {
	temp_min: number
	temp_max: number
}

type IState = {
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
			const result = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=Washington,USA&appid=${process.env.REACT_APP_NOT_SECRET_CODE}&units=metric`);
			const data = await result.json();

			const newData = {
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

			if (!!data) {
				setState(newData);
			}
		}

		dataWeather();
	}, [])

	const renderWeatherParams = () => {
		let keys = (Object.keys(state) as Array<keyof IState>).map(key => key);
		let keysForRender = keys.filter((key) => key !== "success" && key !== "city" && key !== "country" && key !== "error" && key !== "dt");
		let resultParams = keysForRender.map(key => <WeatherParam key={key} name={key} description={state[key]} />);

		return resultParams;
	}

	return (
		<>
			<Background />
			<div className="weather-info">
				<Title city={state.city} country={state.country} date={dateСonversion(state.dt)} />
				<div className="weather-descriptions">
					{!!state.success && renderWeatherParams()}
				</div>
			</div>
		</>
	)
}

export default CardCity;
