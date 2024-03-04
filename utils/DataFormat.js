export const getSortedData = (data) => {
	const monthKeys = Object.keys(data).sort((a, b) => {
		const aYear = a.slice(-4);
		const aMonth = a.slice(0, -4);
		const bYear = b.slice(-4);
		const bMonth = b.slice(0, -4);
		return bYear - aYear || getMonthIndex(bMonth) - getMonthIndex(aMonth);
	});

	// Merge all sorted transactions into a single object
	const sortedTransactions = monthKeys.reduce((acc, key) => {
		acc[key] = data[key];
		return acc;
	}, {});

	return sortedTransactions;
};

export const getMonthIndex = (month) => {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	return months.indexOf(month);
};

export const getMonthName = (monthNumber) => {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const index = parseInt(monthNumber, 10) - 1;

	if (index >= 0 && index < 12) {
		return months[index];
	}
};

export const getBarHeight = (data) => {
	let highestHeight = 0;

	data.forEach((monthYear) => {
		const height = Number(monthYear.totalAmount);
		if (height >= highestHeight) {
			highestHeight = height;
		}
	});
	const res = highestHeight * 1.1;
	return res;
};

export const getPieLegendPercentage = (totalAmount, value) => {
	return ((value / totalAmount) * 100).toFixed(1);
};

export const getLatest12Months = () => {
	const today = new Date();
	const months = [];
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	let currentMonth = today.getMonth();
	let currentYear = today.getFullYear();

	months.push({ month: monthNames[currentMonth], year: currentYear });

	for (let i = 0; i < 11; i++) {
		currentMonth--;
		if (currentMonth === -1) {
			currentMonth = 11;
			currentYear--;
		}

		months.push({ month: monthNames[currentMonth], year: currentYear });
	}
	return months;
};

export const checkDateExceedingCurrent = (str) => {
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth() + 1;

	const monthString = str.slice(0, -4);
	const yearString = str.slice(-4);

	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const monthNumber = months.indexOf(monthString) + 1;

	const yearNumber = parseInt(yearString);

	if (yearNumber > currentYear) {
		return true;
	} else if (yearNumber === currentYear && monthNumber > currentMonth) {
		return true;
	} else {
		return false;
	}
};

export const isValidYear = (inputString) => {
	const year = parseInt(inputString, 10);
	return /^\d{4}$/.test(inputString) && year >= 1000 && year <= 9999;
};

export const isValidNumericValue = (inputString) => {
	return !Number.isNaN(Number(inputString));
};

export const sortArrayToMonthYear = (a, b) => {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const [monthA, yearA] = a.monthYear.split(/(\d+)/); // Split month and year
	const [monthB, yearB] = b.monthYear.split(/(\d+)/); // Split month and year
	const monthIndexA = months.indexOf(monthA);
	const monthIndexB = months.indexOf(monthB);

	// Sort by year first, then by month
	if (yearA !== yearB) {
		return yearB - yearA; // Sort by year in descending order
	} else {
		return monthIndexB - monthIndexA; // Sort by month in descending order
	}
};

export const sortInMonthTransactions = (inMonthTransactions) => {
	const sortedTransactions = inMonthTransactions.sort((a, b) => {
		const dateA = new Date(a.date.split("/").reverse().join("-"));
		const dateB = new Date(b.date.split("/").reverse().join("-"));

		return dateB - dateA;
	});
	return sortedTransactions;
};
