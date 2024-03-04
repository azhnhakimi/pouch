export const getLegendColor = (tag) => {
	const colorMap = {
		clothing: "#5484ED",
		food: "#DC2127",
		utilities: "#FF7400",
		transport: "#5E4DCD",
		personalcare: "#ffffff",
		entertainment: "#800080",
		savings: "#006600",
		miscellaneous: "#FF59C7",
		supplies: "#05FC00",
		subscriptions: "#000000",
	};

	const lowerCaseStr = tag.toLowerCase();
	if (lowerCaseStr === "personal care") {
		return colorMap.personalcare;
	}
	return colorMap[lowerCaseStr];
};

export const getContrastTextColor = (hexColor) => {
	hexColor = hexColor.replace("#", "");

	const r = parseInt(hexColor.substring(0, 2), 16);
	const g = parseInt(hexColor.substring(2, 4), 16);
	const b = parseInt(hexColor.substring(4, 6), 16);

	const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

	return luminance > 0.5 ? "#000000" : "#ffffff";
};
