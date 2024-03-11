import { View, Text, StyleSheet } from "react-native";

const FONTSIZE = 16;

const CalendarDetails = ({ mainText, subText }) => {
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
		flex: 1,
	},
	mainText: {
		fontFamily: "Amaranth",
		fontSize: FONTSIZE,
		textAlign: "left",
	},
	subText: {
		fontFamily: "Roboto",
		fontSize: FONTSIZE,
		textAlign: "left",
	},
});

export default CalendarDetails;
