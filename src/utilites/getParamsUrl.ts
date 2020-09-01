type IGetParamsUrl = {
	city: string
	country: string
	lat: string
	lon: string
}

export const getParamsUrl = (paramsString: string): IGetParamsUrl => {
	let searchParams = new URLSearchParams(paramsString);
	let city = searchParams.get("city");
	let country = searchParams.get("country");
	let lat = searchParams.get("lat");
	let lon = searchParams.get("lon");

	return {city, country, lat, lon} as IGetParamsUrl
}