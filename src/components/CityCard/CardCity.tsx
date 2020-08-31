import React, { useEffect } from 'react';
import WeatherParam from './WeatherParam';
import Background from '../Background';
import Title from './Title';
import { dateСonversion } from '../../utilites/dateСonversion';
import { fetchGetWeatherCity, IStateWeather } from '../../store/weatherCity';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import classes from './CardCity.module.css';
import { getParamsUrl } from '../../utilites/getParamsUrl';

const CardCity = (props: any) => {
	const params = props.location.search;
	const dispatch = useDispatch();
	const weather = useSelector((state: RootState) => state.card);
	const paramsUrl = getParamsUrl(params);
	
	useEffect(() => {
		(async () => {
			dispatch(fetchGetWeatherCity(paramsUrl.city, paramsUrl.country, paramsUrl.lat, paramsUrl.lon));
		})()

	}, [])

	const renderWeatherParams = () => {
		let keys = (Object.keys(weather) as Array<keyof IStateWeather>).map(key => key);
		let keysForRender = keys.filter((key) => key !== "success" && key !== "city" && key !== "country" && key !== "error" && key !== "dt");
		let resultParams = keysForRender.map(key => <WeatherParam key={key} name={key} description={weather[key]} />);

		return resultParams;
	}

	return (
		<>
			<Background />
			<div className={classes.weatherInfo}>
				{!!weather.success
					? <>
						<Title city={weather.city} country={weather.country} date={dateСonversion(weather.dt)} />
						<div className={classes.weatherDescriptions}>
							{!!weather.success && renderWeatherParams()}
						</div>
					</>
					: <p>Loading!</p>
				}
			</div>
		</>
	)
}

export default CardCity;
