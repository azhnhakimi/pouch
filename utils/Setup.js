import { StatusBar, Platform } from "react-native";

export const setup = () => {
	if (Platform.OS === "android") {
		StatusBar.setBackgroundColor("#000000");
		StatusBar.setBarStyle("light-content");
	} else {
		StatusBar.setBarStyle("dark-content");
	}
};
