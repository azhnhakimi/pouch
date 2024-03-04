import {
	StyleSheet,
	View,
	SafeAreaView,
	Platform,
	StatusBar,
} from "react-native";
import FlashMessage from "react-native-flash-message";
import { MenuProvider } from "react-native-popup-menu";

import { loadCustomFonts } from "./utils/FontLoader";
import { setUpStatusBar } from "./utils/Setup";

import LoadingScreen from "./screens/LoadingScreen";
import Navigation from "./Navigation";

export default function App() {
	const [loaded] = loadCustomFonts();
	setUpStatusBar();

	if (!loaded) {
		return <LoadingScreen />;
	}

	return (
		<MenuProvider>
			<SafeAreaView style={styles.safeContainer}>
				<View style={styles.container}>
					<Navigation />
				</View>
				<FlashMessage
					position="top"
					duration={1850}
					statusBarHeight={
						Platform.OS === "android" ? StatusBar.currentHeight : 0
					}
					// floating={true}
					titleStyle={styles.titleStyle}
					textStyle={styles.textStyle}
				/>
			</SafeAreaView>
		</MenuProvider>
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
	titleStyle: {
		color: "#ffffff",
		fontFamily: "Roboto",
		fontWeight: "bold",
		fontSize: 18,
	},
	textStyle: {
		color: "#ffffff",
		fontFamily: "Roboto",
		fontSize: 15,
	},
	contextMenuStyle: {
		backgroundColor: "pink",
	},
});

// TODO:
// 1. Plan Data Structure
// 2. Complete Screens
// 3. Set up navigation
