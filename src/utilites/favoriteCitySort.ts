import { ICity } from './../store/cities';

export const favoriteCitySort = (a: ICity, b: ICity): number => {
	let nameA = a.city.toLowerCase(), nameB = b.city.toLowerCase();
	if (nameA < nameB)
		return -1
	if (nameA > nameB)
		return 1
	return 0
}