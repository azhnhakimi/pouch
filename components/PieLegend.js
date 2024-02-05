import { View, Text, StyleSheet } from "react-native";

const markerDimension = 15;

const PieLegend = () => {
	return (
		<View style={styles.container}>
			<View style={styles.marker}></View>
			<Text style={styles.text}>Food, 25%</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// backgroundColor: "orange",
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	marker: {
		width: markerDimension,
		height: markerDimension,
		backgroundColor: "purple",
	},
	text: {
		fontSize: 14,
		fontFamily: "Amaranth",
	},
});

export default PieLegend;
