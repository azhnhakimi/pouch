import { View, StyleSheet, Text } from "react-native";

const NoCalendarPanel = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>No calendar has been created.</Text>
			<Text style={styles.text}>Add a new calendar to get started!</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: 70,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontSize: 16,
		fontFamily: "Amiko",
	},
});

export default NoCalendarPanel;
