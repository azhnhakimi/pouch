import { StatusBar, Platform } from "react-native";

export const setUpStatusBar = () => {
	if (Platform.OS === "android") {
		StatusBar.setBackgroundColor("#000000");
		StatusBar.setBarStyle("light-content");
	} else {
		StatusBar.setBarStyle("dark-content");
	}
};

export const resetStatusBar = () => {
	if (Platform.OS === "android") {
		StatusBar.setBackgroundColor("transparent");
		StatusBar.setBarStyle("dark-content");
	} else {
		StatusBar.setBarStyle("light-content");
	}
};
