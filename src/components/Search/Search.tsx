import React, { useState } from 'react';
import Input from '../ui/Input';
import Background from '../Background';
import classes from './Search.module.css'

const Search = () => {
	const [value, setValue] = useState("");

	return (
		<div className={classes.search}>
			<Background />
			<div className="weather-info">
				<h5>Location</h5>
				<Input
					type="text"
					value=""
					placeholder="Enter your city"
					onChange={() => { }}
				/>
			</div>
		</div>
	)
}

export default Search;