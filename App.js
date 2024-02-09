import {
	StyleSheet,
	View,
	SafeAreaView,
	Platform,
	StatusBar,
} from "react-native";

import LoadingScreen from "./screens/LoadingScreen";
import { loadCustomFonts } from "./utils/FontLoader";

import Navigation from "./Navigation";

export default function App() {
	const [loaded] = loadCustomFonts();

	if (!loaded) {
		return <LoadingScreen />;
	}

	return (
		<SafeAreaView style={styles.safeContainer}>
			<View style={styles.container}>
				<Navigation />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeContainer: {
		flex: 1,
		backgroundColor: "#ffffff",
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
	},
	container: {
		flex: 1,
		backgroundColor: "#ffffff",
		paddingHorizontal: 10,
	},
});

// TODO:
// 1. Plan Data Structure
// 2. Complete Screens
// 3. Set up navigation
