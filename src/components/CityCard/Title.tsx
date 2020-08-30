import React from 'react';
import places from '../../img/places.png';
import classes from './CardCity.module.css';

type IDate = {
	day: string
	month: string
	year: number 
	hour: number
	minute: number
	numberOfMonths: number
}

type IProps = {
	city: string | undefined
	country: string | undefined
	date: IDate | undefined
}

const Title = ({city, country, date}: IProps) => {
	return (
		<div className={classes.weatherTitle}>
		<p>{`${date?.day}, ${date?.numberOfMonths} ${date?.month} ${date?.year} | ${date?.hour}:${date?.minute}`}</p>
		<p>{city}, {country}
			<span>
				<img src={places} alt="places" />
			</span>
		</p>
	</div>
	)
}

export default Title;