import React, { useState } from 'react';
import Input from '../ui/Input';
import { Typeahead } from '@gforge/react-typeahead-ts';
import Background from '../Background';
import classes from './Search.module.css'
import { useDispatch } from 'react-redux';
import { findCity } from '../../store/cities';


const Search = () => {
	const dispatch = useDispatch();
	const [value, setValue] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.currentTarget.value);
	}

	const handleClick = () => {
		dispatch(findCity(value));
	}

	return (
		<div className={classes.search}>
			<Background />
			<div className="weather-info">
				<h5>Location</h5>
				<Input
					type="text"
					value={value}
					placeholder="Enter your city"
					onChange={handleChange}
				/>
				<Typeahead
					options={['John', 'Paul', 'George', 'Ringo']}
					showOptionsWhenEmpty={true}
					className="inputStyle"
					customClasses={{
						results: 'list-group',
						listItem: 'list-group-item'
					}}
				/>
				<button onClick={handleClick}>Send</button>
			</div>
		</div>
	)
}

export default Search;