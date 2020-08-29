import React from 'react';
import places from '../img/places.png';

type IDate = {
	day: string
	month: string
	year: number 
	hour: number
	minute: number
}

type IProps = {
	city: string | undefined
	country: string | undefined
	date: IDate | undefined
}

const Title = ({city, country, date}: IProps) => {
	console.log('date ', date)
	return (
		<div className="weather-title">
		<p>{`${date?.day}, 19 ${date?.month} ${date?.year} | 4:30PM`}</p>
		<p>{city}, {country}
			<span>
				<img src={places} alt="places" />
			</span>
		</p>
	</div>
	)
}

export default Title;