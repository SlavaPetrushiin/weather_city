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

	saveFavorites(favorite: any) {
		if (!!this.getFavorites()) {
			const favorites = this.getFavorites();
			const newFavorites = [...favorites, favorite];
			localStorage.setItem(this.KEYS.favorites, JSON.stringify(newFavorites));
		}
	},

	removeImage(id: string) {
		const favorites = this.getFavorites();
		const newFavorites = favorites.filter((favorite: any) => favorite.id !== id);
		localStorage.setItem(this.KEYS.favorites, JSON.stringify(newFavorites));
	}
};

export default storageApi;