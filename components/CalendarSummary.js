import { View, Text, StyleSheet } from "react-native";

const FONTSIZE = 16;

const CalendarSummary = ({ mainText, subText }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.mainText}>{mainText}</Text>
			<Text style={styles.subText}>{subText}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
	},
	mainText: {
		fontFamily: "Amaranth",
		fontSize: FONTSIZE,
		textAlign: "right",
	},
	subText: {
		fontFamily: "Roboto",
		fontSize: FONTSIZE,
		textAlign: "right",
	},
});

export default CalendarSummary;
