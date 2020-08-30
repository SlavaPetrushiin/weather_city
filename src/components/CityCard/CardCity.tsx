import React, { useEffect } from 'react';
import WeatherParam from './WeatherParam';
import Background from '../Background';
import Title from './Title';
import { dateСonversion } from '../../utilites/dateСonversion';
import { fetchGetWeatherCity, IStateWeather } from '../../store/weatherCity';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const CardCity = (props: any) => {
	const params = props.match.params;
	const dispatch = useDispatch();
	const state = useSelector((state: RootState) => state.card)

	useEffect(() => {
		(async () => {
			dispatch(fetchGetWeatherCity(params.city, params.country))
		})()

	}, [])

	const renderWeatherParams = () => {
		let keys = (Object.keys(state) as Array<keyof IStateWeather>).map(key => key);
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
