import { ICity } from "../store/cities";

const storageApi = {
	KEYS: {
		favorites: "favorites"
	},

	getFavorites() {
		if (!localStorage.getItem(this.KEYS.favorites)) {
			localStorage.setItem("favorites", JSON.stringify([]));
			return false;
		}
		const favorites = JSON.parse(localStorage.getItem(this.KEYS.favorites)!);
		return favorites;
	},

	saveFavorites(favoritesCities: Array<ICity>) {
		if (!!this.getFavorites()) {
			localStorage.setItem(this.KEYS.favorites, JSON.stringify(favoritesCities));
		}
	},

	removeImage(id: string) {
		const favorites = this.getFavorites();
		const newFavorites = favorites.filter((favorite: any) => favorite.id !== id);
		localStorage.setItem(this.KEYS.favorites, JSON.stringify(newFavorites));
	}
};

export default storageApi;