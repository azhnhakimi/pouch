export const getShortMonthName = (monthName) => {
	const months = {
		January: "Jan",
		February: "Feb",
		March: "Mar",
		April: "Apr",
		May: "May",
		June: "Jun",
		July: "Jul",
		August: "Aug",
		September: "Sep",
		October: "Oct",
		November: "Nov",
		December: "Dec",
	};

	monthName = monthName
		.toLowerCase()
		.replace(/\b\w/g, (c) => c.toUpperCase());

	return months[monthName] || "Invalid Month";
};

export const getMonthName = (monthYear) => {
	return monthYear.substring(0, monthYear.length - 4);
};

export const getDate = (date) => {
	return date.substring(0, 2);
};
