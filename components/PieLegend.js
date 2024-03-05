import { View, Text, StyleSheet } from "react-native";
import { getLegendColor } from "../utils/Color";

const markerDimension = 15;

const PieLegend = ({ tag, value }) => {
	if (tag === "personalCare") {
		tag = "personal care";
	}

	return (
		<View style={[styles.container]}>
			<View
				style={[
					styles.marker,
					{
						backgroundColor: getLegendColor(tag),
						borderColor: "#000000",
						borderStyle: "solid",
						borderWidth: 1,
					},
				]}
			></View>
			<Text style={styles.text}>{`${tag}, ${value}%`}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// backgroundColor: "orange",
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		width: "80%",
		justifyContent: "flex-start",
	},
	marker: {
		width: markerDimension,
		height: markerDimension,
	},
	text: {
		fontSize: 14,
		fontFamily: "Amaranth",
		textTransform: "capitalize",
	},
});

export default PieLegend;
