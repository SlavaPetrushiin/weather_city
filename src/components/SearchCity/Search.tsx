import React, { useState } from 'react';
import { Typeahead } from '@gforge/react-typeahead-ts';
import Background from '../Background';
import classes from './Search.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { findCity, updateFavoritesCities, removeLocalFavoriteCity } from '../../store/cities';
import { RootState } from '../../store/store';
import ListCities from '../ListCities/ListCities';


const Search = () => {
	const dispatch = useDispatch();
	const [value, setValue] = useState('');
	const foundCities = useSelector((state: RootState) => state.cities.cities);
	const favoritesCities = useSelector((state: RootState) => state.cities.favorites);
	const citiesForTypeahead = foundCities.map((city: any) => `${city.city}, ${city.country}`);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.currentTarget.value);
	}

	const handleEnter = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter') {
			dispatch(findCity(value));
		}
	};

	const handleOptionSelected = async (city: any) => {
		dispatch(updateFavoritesCities(city));
	}

	const removeFavoriteCity = (id: string) => {
		dispatch(removeLocalFavoriteCity(id));
	}

	return (
		<div className={classes.search}>
			<Background />
			<div className='weather-info'>
				<h5>Location</h5>
				<Typeahead
					className={classes.typeahead}
					options={[...citiesForTypeahead]}
					showOptionsWhenEmpty={true}
					placeholder='Enter your city'
					onChange={handleChange}
					onKeyPress={handleEnter}
					onOptionSelected={handleOptionSelected}
					value={value}
					clearOnSelection={true}
				/>
				<ListCities 
					favoritesCities={favoritesCities}
					removeFavoriteCity={removeFavoriteCity}
				/>
			</div>
		</div>
	)
}

export default Search;