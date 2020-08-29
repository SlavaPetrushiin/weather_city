import React from 'react';
import humidity from '../../img/humidity.png';
import barometer from '../../img/barometer.png'
import wind from '../../img/wind.png';
import vector from '../../img/vector.png';
import cloud from '../../img/vector_cloud.png';
import clock from '../../img/sand-clock.png';
import sunrise from '../../img/sunrise.png';
import sunset from '../../img/sunset.png';
import { ITemperatureChange } from '../../store/weatherCity';


type IProps = {
	name: string
	description: string | boolean | undefined | number | ITemperatureChange
}

const WeatherParam = (props: IProps) => {
	let iconSrc, unit;
	let cls = [];
	switch (props.name) {
		case "pressure": {
			iconSrc = barometer;
			unit = "mBar";
			break;
		}
		case "humidity": {
			iconSrc = humidity;
			unit = "%";
			break;
		}
		case "wind": {
			iconSrc = wind;
			unit = "km/h";
			break;
		}
		case "clouds": {
			iconSrc = cloud;
			break;
		}
		case "daytime": {
			iconSrc = clock;
			unit = "H";
			break;
		}
		case "sunrise": {
			iconSrc = sunrise;
			unit = "AM";
			break;
		}
		case "sunset": {
			iconSrc = sunset;
			unit = "PM";
			break;
		}
		case "description": {
			iconSrc = vector;
			break;
		}
		case "temperature": {
			cls.push("degrees");
			break;
		}
		default: {
			iconSrc = undefined
		}
	}


	let desc = typeof props.description !==  'object' 
		? props.description
		: `${props.description.temp_max} ${props.description.temp_min}`

	return (
		<div className="weather-description">
			{
				props.name !== "temperature" && <span className="blockIconImg">
					<img src={iconSrc} />
				</span>
			}

			<span className={cls.join(' ')}>{desc} {!!unit && unit}</span>
			{
				props.name !== "temperature" && <span>{props.name}</span>
			}
		</div>
	)
}

export default WeatherParam;