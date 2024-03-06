import { useState, useEffect, useCallback, useMemo } from "react";
import {
	StyleSheet,
	View,
	SafeAreaView,
	Platform,
	StatusBar,
} from "react-native";
import FlashMessage from "react-native-flash-message";
import * as SplashScreen from "expo-splash-screen";
import { MenuProvider } from "react-native-popup-menu";

import { loadCustomFonts } from "./utils/FontLoader";
import { resetStatusBar, setUpStatusBar } from "./utils/Setup";

import Navigation from "./Navigation";

SplashScreen.preventAutoHideAsync();

export default function App() {
	const [loaded] = loadCustomFonts();

	const hideSplashScreen = useCallback(async () => {
		if (loaded) {
			resetStatusBar();
			await SplashScreen.hideAsync();
		} else {
			setUpStatusBar();
		}
	}, [loaded]);

	return loaded ? (
		<MenuProvider>
			<SafeAreaView style={styles.safeContainer}>
				<View style={styles.container} onLayout={hideSplashScreen}>
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
	) : null;
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
});
