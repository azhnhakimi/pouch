import { View, StyleSheet, Text } from "react-native";
import { SvgXml } from "react-native-svg";

const WIDTH = 30;
const HEIGHT = (WIDTH / 200) * 203;
const FONTSIZE = 0.35 * WIDTH;

const CalendarIcon = ({ text }) => {
	const svgXml =
		'<svg width="200" height="203" viewBox="0 0 200 203" fill="none" xmlns="http://www.w3.org/2000/svg">' +
		'<rect y="17" width="200" height="186" rx="23" fill="black"/>' +
		'<path d="M59 17H79V37C79 41.4183 75.4183 45 71 45H67C62.5817 45 59 41.4183 59 37V17Z" fill="white"/>' +
		'<path d="M120 17H140V37C140 41.4183 136.418 45 132 45H128C123.582 45 120 41.4183 120 37V17Z" fill="white"/>' +
		'<rect x="63" width="12" height="40" rx="6" fill="black"/>' +
		'<path d="M15 55H185V179C185 184.523 180.523 189 175 189H25C19.4772 189 15 184.523 15 179V55Z" fill="white"/>' +
		'<rect x="124" width="12" height="40" rx="6" fill="black"/>' +
		"</svg>";

	return (
		<View style={styles.container}>
			<SvgXml xml={svgXml} width="100%" height="100%" />
			<Text style={styles.text}>{text}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: WIDTH,
		height: HEIGHT,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		position: "absolute",
		fontFamily: "AnekBangla",
		fontSize: FONTSIZE,
		top: "32%",
	},
});

export default CalendarIcon;
