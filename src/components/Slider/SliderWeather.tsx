import React from 'react';
import classes from './SliderWeather.module.css'
import rain from '../../img/rain.png'
import clouds from '../../img/vector_cloud.png';
import sunny from '../../img/sunny.png' 
import { IDailyWeather } from '../../store/weatherCity';
import { getCelsiusDegree } from '../../utilites/getCelsiusDegree';
import { dateСonversion } from '../../utilites/dateСonversion';

const Slide = (props: any) => {
	const day = props.day;
	const date = dateСonversion(props.day.dt);
	const dayWeek = date.day.split('').slice(0, 3).join('');

	let iconSrc;
	switch (day.weather[0].main) {
		case "Clouds": {
			iconSrc = clouds;
			break;
		}
		case "Rain": {
			iconSrc = rain;
			break;
		}
		case "Clear": {
			iconSrc = sunny;
			break;
		}
		default: {
			iconSrc = undefined;
			break;
		}
	}

	return (
		<div className={classes.dayWeek}>
			<span className={classes.slideImg}>
				<img src={iconSrc} alt="icon" />
			</span>
			<span className={classes.dayName}>
				{dayWeek},{getCelsiusDegree(day.temp.day)}&#176;C
			</span>
			<span className={classes.temperatureDay}>
				{getCelsiusDegree(day.temp.max)} &#176;C&uarr;
				{getCelsiusDegree(day.temp.min)}&#176;C&darr;
			</span>
		</div>
	)
}

const SliderWeather = (props: any) => {
	const daily = props.daily;
	const renderSlides = () => {
		return daily.map((d: IDailyWeather) => <Slide day={d}/>)
	}

	return (
		<div className={classes.slider}>
			{renderSlides()}
		</div>
	);
};

export default SliderWeather;
