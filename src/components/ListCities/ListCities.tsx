import React, { useState } from 'react';
import { ICity } from '../../store/cities';
import classes from './ListCities.module.css';

type IProps = {
	favoritesCities: Array<ICity>
}

const ListCities = ({favoritesCities}: IProps) => {
	const renderFavoritesCities = (favoritesCities: Array<ICity>) => {
		return favoritesCities.map((favorite: ICity) => {
			return (
				<li className={classes.listItem}>
					<span>{`${favorite.city}, ${favorite.country}`}</span>
					<span>{`${favorite.temperature}`}&#176;C</span>
				</li>
			)
		})
	}

	return (
		<ul className={classes.listCities}>
		{
			favoritesCities.length !== 0 ? renderFavoritesCities(favoritesCities) : <li className={classes.listItem}>Список пуст!</li>
		}
	</ul>
	)
}

export default ListCities;