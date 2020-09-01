import React from 'react';
import classes from './SliderWeather.module.css'
import rain from '../../img/rain.png'
import clouds from '../../img/vector_cloud.png';
import sunny from '../../img/sunny.png' 
import { IDailyWeather } from '../../store/weatherCity';

const Slide = (props: any) => {
	const day = props.day;
	debugger

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
				<img src={iconSrc} alt="" />
			</span>
			<span className={classes.dayName}>
				25
			</span>
			<span className={classes.temperatureDay}>
				25 and 25
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
