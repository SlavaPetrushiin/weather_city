import React from 'react';
import humidity from '../../img/humidity.png';
import barometer from '../../img/barometer.png'
import wind from '../../img/wind.png';
import vector from '../../img/vector.png';
import cloud from '../../img/vector_cloud.png';
import clock from '../../img/sand-clock.png';
import sunrise from '../../img/sunrise.png';
import sunset from '../../img/sunset.png';
import { TemperatureChangeType } from '../../store/weatherCity';
import classes from './CardCity.module.css';

type IProps = {
	name: string
	description: string | boolean | undefined | number | TemperatureChangeType
}

enum WeatherParamEnum  {
	pressure = 'pressure',
	humidity = 'humidity',
	wind = 'wind',
	clouds = 'clouds',
	daytime = 'daytime',
	sunrise = 'sunrise',
	sunset = 'sunset',
	description = 'description',
	temperature = 'temperature'
}

const WeatherParam = (props: IProps) => {
	let iconSrc, unit;
	let cls = [];
	switch (props.name) {
		case WeatherParamEnum.pressure: {
			iconSrc = barometer;
			unit = "mBar";
			break;
		}
		case WeatherParamEnum.humidity: {
			iconSrc = humidity;
			unit = "%";
			break;
		}
		case WeatherParamEnum.wind: {
			iconSrc = wind;
			unit = "km/h";
			break;
		}
		case WeatherParamEnum.clouds: {
			iconSrc = cloud;
			break;
		}
		case WeatherParamEnum.daytime: {
			iconSrc = clock;
			unit = "H";
			break;
		}
		case WeatherParamEnum.sunrise: {
			iconSrc = sunrise;
			unit = "AM";
			break;
		}
		case WeatherParamEnum.sunset: {
			iconSrc = sunset;
			unit = "PM";
			break;
		}
		case WeatherParamEnum.description: {
			iconSrc = vector;
			break;
		}
		case WeatherParamEnum.temperature: {
			cls.push(`${classes.degrees}`);
			break;
		}
		default: {
			iconSrc = undefined
		}
	}

	let desc = typeof props.description !== 'object'
		? <>{props.description} {!!unit && unit}</>
		: (
			<div className={classes.changeTemp}>
				<span>
					{`${props.description.temp_max}`}&#176;C&uarr;
				</span>
				<span>
					{`${props.description.temp_min}`}&#176;C&darr;
				</span>
			</div>
		)

	let tem = props.name === 'temperature'
		? <span className={cls.join(' ')}>{desc}<span className={classes.tem}>&#176;C</span></span>
		: <>{desc}</>

	return (
		<div className={classes.weatherDescription}>
			{
				props.name !== 'temperature' && typeof props.description !== 'object' && <span className={classes.blockIconImg}>
					<img src={iconSrc} />
				</span>
			}
			{tem}
			{props.name !== 'temperature' && typeof props.description !== 'object' && <span className={classes.des}>{props.name}</span>}
		</div>
	)
}

export default WeatherParam;