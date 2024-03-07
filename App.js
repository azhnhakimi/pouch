import { useState, useEffect, useCallback, useMemo } from "react";
import { StyleSheet, View, Animated, Text } from "react-native";
import Constants from "expo-constants";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import { resetStatusBar, setUpStatusBar } from "./utils/Setup";
import { loadCustomFonts } from "./utils/FontLoader";

import MainScreen from "./MainScreen";

SplashScreen.preventAutoHideAsync().catch((e) => {
	console.log(e);
});

export default function App() {
	const [isFontLoaded, setFontLoaded] = useState(false);

	useEffect(() => {
		async function loadFonts() {
			try {
				await Font.loadAsync({
					Amaranth: require("./assets/fonts/Amaranth.ttf"),
					Amiko: require("./assets/fonts/Amiko.ttf"),
					AnekBangla: require("./assets/fonts/AnekBangla.ttf"),
					LondrinaSolid: require("./assets/fonts/LondrinaSolid.ttf"),
					Roboto: require("./assets/fonts/Roboto.ttf"),
				});
				setFontLoaded(true);
			} catch (error) {
				console.error("Error loading fonts:", error);
			}
		}

		loadFonts();
	}, []);

	if (!isFontLoaded) {
		// Return a loading indicator or null if the fonts are not loaded yet
		return (
			<View style={{ backgroundColor: "red", flex: 1 }}>
				<Text style={{ color: "#ffffff" }}>hello</Text>
			</View>
		);
	}

	return (
		<AnimatedAppLoader image={{ uri: Constants.expoConfig.splash.image }}>
			<MainScreen />
		</AnimatedAppLoader>
	);
}

function AnimatedAppLoader({ children, image }) {
	const [isSplashReady, setSplashReady] = useState(false);

	useEffect(() => {
		async function prepare() {
			try {
				await Asset.fromModule(
					require("./assets/customSplash.png")
				).downloadAsync();
				// await Asset.fromURI(image.uri).downloadAsync();
				setSplashReady(true);
			} catch (error) {
				console.error("Error downloading image:", error);
			}
		}

		prepare();
	}, [image]);

	if (!isSplashReady) {
		return null;
	}

	return (
		<AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>
	);
}

function AnimatedSplashScreen({ children, image }) {
	const animation = useMemo(() => new Animated.Value(1), []);
	const [isAppReady, setAppReady] = useState(false);
	const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

	useEffect(() => {
		if (isAppReady) {
			resetStatusBar();
			Animated.timing(animation, {
				toValue: 0,
				duration: 500,
				useNativeDriver: true,
			}).start(() => {
				setAnimationComplete(true);
			});
		}
	}, [isAppReady]);

	const onImageLoaded = useCallback(async () => {
		try {
			await SplashScreen.hideAsync();
			await Promise.all([]);
		} catch (e) {
			// handle errors
		} finally {
			setAppReady(true);
		}
	}, []);

	return (
		<View style={{ flex: 1 }}>
			{isAppReady && children}
			{!isSplashAnimationComplete && (
				<Animated.View
					pointerEvents="none"
					style={[
						StyleSheet.absoluteFill,
						{
							backgroundColor:
								Constants.expoConfig.splash.backgroundColor,
							opacity: animation,
						},
					]}
				>
					<Animated.Image
						style={{
							width: "100%",
							height: "100%",
							resizeMode:
								Constants.expoConfig.splash.resizeMode ||
								"contain",
							opacity: animation,
						}}
						source={require("./assets/customSplash.png")}
						onLoadEnd={onImageLoaded}
						fadeDuration={0}
					/>
				</Animated.View>
			)}
		</View>
	);
}
