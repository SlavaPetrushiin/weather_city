import React, { useState, useEffect } from 'react';
import { Typeahead } from '@gforge/react-typeahead-ts';
import Background from '../Background';
import classes from './Search.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { findCity, updateFavoritesCities, removeLocalFavoriteCity, ICity, updateTemperatureByReload } from '../../store/cities';
import { RootState } from '../../store/store';
import ListCities from '../ListCities/ListCities';

const Search = () => {
	const dispatch = useDispatch();
	const [value, setValue] = useState('');
	const foundCities = useSelector((state: RootState) => state.cities);
	const favoritesCities = useSelector((state: RootState) => state.cities.favorites);
	const citiesForTypeahead = foundCities.foundCities.map((city: any) => `${city.city}, ${city.country}`);

	useEffect(() => {
		dispatch(updateTemperatureByReload())
	}, [])

	const renderFavoritesCities = () =>  favoritesCities.filter((city: ICity) => {
		let coincidence = city.city.toLocaleLowerCase().includes(value.toLocaleLowerCase())
		if(!!value && coincidence){
			return city
		}
		if(!value) return city
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.currentTarget.value);
	}

	const handleEnter = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter') {
			dispatch(findCity(value));
		}
	};

	const handleOptionSelected = (city: any) => {
		setValue('');
		dispatch(updateFavoritesCities(city));
	}

	const removeFavoriteCity = (id: string) => {
		dispatch(removeLocalFavoriteCity(id));
	}

	return (
		<div className={classes.search}>
			<Background />
			<div className={classes.searchInfo}>
				<h5>Location</h5>
				{
					!!foundCities.error && <p className={classes.error}>{foundCities.message}</p>
				}
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
					favoritesCities={renderFavoritesCities}
					removeFavoriteCity={removeFavoriteCity}
				/>
			</div>
		</div>
	)
}

export default Search;