import React, { useMemo } from 'react';
import { ICity } from '../../store/cities';
//@ts-ignore
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import classes from './ListCities.module.css';
import { Link } from 'react-router-dom';

type IProps = {
	favoritesCities: () => Array<ICity>
	removeFavoriteCity: (id: string) => void
}

const ListCities = ({ favoritesCities, removeFavoriteCity }: IProps) => {
	const renderFavoritesCities = useMemo(() => {
		return (favoritesCities: Array<ICity>) => {
			return favoritesCities.map((favorite: ICity) => {
				return (
					<li className={classes.listItem} key={favorite.id}>
						<Link to={`/weather?city=${favorite.city}&country=${favorite.country}&lat=${favorite.lat}&lon=${favorite.lon}`} className={classes.itemLink}>
							<span>{`${favorite.city}, ${favorite.country}`}</span>
							<span className={classes.temperature}>{`${favorite.temperature}`}&#176;C</span>
						</Link>
						<FontAwesomeIcon
							icon={faTrash}
							onClick={() => removeFavoriteCity(favorite.id)}
						/>
					</li>
				)
			})
		}
	}, [favoritesCities]) 

	return (
		<ul className={classes.listCities}>
			{
				favoritesCities().length !== 0 ? renderFavoritesCities(favoritesCities()) : <li className={classes.listItem}>Список пуст!</li>
			}
		</ul>
	)
}

export default ListCities;