import React, { useEffect } from 'react';
import WeatherParam from './WeatherParam';
import Background from '../Background';
import Title from './Title';
import { dateСonversion } from '../../utilites/dateСonversion';
import { fetchGetWeatherCity, ICurrentWeather } from '../../store/weatherCity';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import classes from './CardCity.module.css';
import { getParamsUrl } from '../../utilites/getParamsUrl';
import SliderWeather from '../Slider/SliderWeather';

const CardCity = (props: any) => {
	const params = props.location.search;
	const paramsUrl = getParamsUrl(params);
	const dispatch = useDispatch();
	const current = useSelector((state: RootState) => state.card.current);
	const daily = useSelector((state: RootState) => state.card.daily);
	
	useEffect(() => {
		(async () => {
			dispatch(fetchGetWeatherCity(paramsUrl.city, paramsUrl.country, paramsUrl.lat, paramsUrl.lon));
		})()
	}, [])

	const renderWeatherParams = () => {
		let keys = (Object.keys(current) as Array<keyof ICurrentWeather>).map(key => key);
		let keysForRender = keys.filter((key) => key !== "success" && key !== "city" && key !== "country" && key !== "error" && key !== "dt");
		let resultParams = keysForRender.map(key => <WeatherParam key={key} name={key} description={current[key]} />);

		return resultParams;
	}

	return (
		<>
			<Background />
			<div className={classes.weatherInfo}>
				{!!current.success
					? <>
						<Title city={current.city} country={current.country} date={dateСonversion(current.dt)} />
						<div className={classes.weatherDescriptions}>
							{!!current.success && renderWeatherParams()}
						</div>
					</>
					: <p>Loading!</p>
				}
				<SliderWeather daily={daily}/>
			</div>
		</>
	)
}

export default CardCity;
