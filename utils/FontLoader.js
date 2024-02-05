import { useFonts } from "expo-font";

export const loadCustomFonts = () => {
	return useFonts({
		Amaranth: require("../assets/fonts/Amaranth.ttf"),
		Amiko: require("../assets/fonts/Amiko.ttf"),
		AnekBangla: require("../assets/fonts/AnekBangla.ttf"),
		LondrinaSolid: require("../assets/fonts/LondrinaSolid.ttf"),
		Roboto: require("../assets/fonts/Roboto.ttf"),
	});
};
