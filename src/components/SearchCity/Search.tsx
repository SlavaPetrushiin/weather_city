import React, { useState } from 'react';
import { Typeahead } from '@gforge/react-typeahead-ts';
import Background from '../Background';
import classes from './Search.module.css'
import { useDispatch, useSelector, Options } from 'react-redux';
import { findCity, updateFavouritesCyties } from '../../store/cities';
import { RootState } from '../../store/store';


const Search = () => {
	const dispatch = useDispatch();
	const [value, setValue] = useState("");
	const state = useSelector((state: RootState) => state.cities);
	const citiesForTypeahead = state.cities.map((city: any) => `${city.city}, ${city.country}`)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.currentTarget.value);
	}

	const handleEnter = (event: React.KeyboardEvent) => {
		if (event.key === "Enter") {
			dispatch(findCity(value));
		}
	};

	const handleOptionSelected = (city: any) => {
		dispatch(updateFavouritesCyties(city)) 
	}

	return (
		<div className={classes.search}>
			<Background />
			<div className="weather-info">
				<h5>Location</h5>
				<Typeahead
					className={classes.typeahead}
					options={[...citiesForTypeahead]}
					showOptionsWhenEmpty={false}
					placeholder="Enter your city"
					onChange={handleChange}
					onKeyPress={handleEnter}
					onOptionSelected={handleOptionSelected}
					value={value}
				/>
			</div>
		</div>
	)
}

export default Search;