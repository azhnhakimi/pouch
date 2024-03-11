import {
	StyleSheet,
	View,
	SafeAreaView,
	Platform,
	StatusBar,
} from "react-native";
import FlashMessage from "react-native-flash-message";
import { MenuProvider } from "react-native-popup-menu";

import Navigation from "./Navigation";

const MainScreen = () => {
	return (
		<MenuProvider>
			<View style={styles.container}>
				<Navigation />
			</View>
			<FlashMessage
				position="top"
				duration={1850}
				titleStyle={styles.titleStyle}
				textStyle={styles.textStyle}
				floating={true}
			/>
		</MenuProvider>
	);
};

const styles = StyleSheet.create({
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

export default MainScreen;
