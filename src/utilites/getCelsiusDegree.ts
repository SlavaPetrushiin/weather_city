export const getCelsiusDegree = (temperature: number): number => {
	let temperatureNum = Math.round(temperature);
	return temperatureNum - 273;
};