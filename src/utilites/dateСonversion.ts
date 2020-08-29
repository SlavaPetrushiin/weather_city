export const dateСonversion = (value: any) => {
	let months = [
		'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
	]
	let days = [
		'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
	];

	let date = new Date(+value * 1000);
	let hour = date.getHours();
	let minute = date.getMinutes();
	let day = days[date.getDay()];
	let numberOfMonths = date.getDate();
	let month = months[date.getMonth()];
	let year = date.getFullYear();

	return { day, month, year, hour, minute, numberOfMonths }
}