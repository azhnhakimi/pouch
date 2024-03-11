import { StatusBar, Platform } from "react-native";

export const setUpStatusBar = () => {
	if (Platform.OS === "android") {
		StatusBar.setBackgroundColor("#000000", true);
		StatusBar.setBarStyle("light-content", true);
	} else {
		StatusBar.setBarStyle("dark-content", true);
	}
};

export const resetStatusBar = () => {
	if (Platform.OS === "android") {
		StatusBar.setBackgroundColor("#ffffff", true);
		StatusBar.setBarStyle("dark-content", true);
	} else {
		StatusBar.setBarStyle("light-content", true);
	}
};
