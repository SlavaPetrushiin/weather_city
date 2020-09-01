import { ICity } from "../store/cities";

const storageApi = {
	KEYS: {
		favorites: "favorites"
	},

	getCities() {
		if (!localStorage.getItem(this.KEYS.favorites)) {
			localStorage.setItem("favorites", JSON.stringify([]));
			return false;
		}
		const favorites = JSON.parse(localStorage.getItem(this.KEYS.favorites)!);
		return favorites;
	},

	saveCity(favoritesCities: Array<ICity>) {
		if (!!this.getCities()) {
			localStorage.setItem(this.KEYS.favorites, JSON.stringify(favoritesCities));
		}
	},

	removeCity(id: string) {
		const favorites = this.getCities();
		const newFavorites = favorites.filter((favorite: any) => favorite.id !== id);
		localStorage.setItem(this.KEYS.favorites, JSON.stringify(newFavorites));
	}
};

export default storageApi;