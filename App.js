import { StyleSheet, View } from "react-native";

import LoadingScreen from "./screens/LoadingScreen";
import { loadCustomFonts } from "./utils/FontLoader";

import CalendarScreen from "./screens/CalendarScreen";
import CustomInputField from "./components/CustomInputField";
import CustomPicker from "./components/CustomPicker";
import CustomPieChart from "./components/CustomPieChart";
import SpendingsScreen from "./screens/SpendingsScreen";
import CollectorTile from "./components/CollectorTile";
import AddCollectorBtn from "./components/AddCollectorBtn";
import CollectorScreen from "./screens/CollectorScreen";

export default function App() {
	const [loaded] = loadCustomFonts();

	if (!loaded) {
		return <LoadingScreen />;
	}

	return (
		<View style={styles.container}>
			<SpendingsScreen />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		paddingHorizontal: 10,
		paddingTop: 60,
		gap: 30,
	},
});

// TODO:
// 1. Plan Data Structure
// 2. Complete Screens
// 3. Set up navigation
