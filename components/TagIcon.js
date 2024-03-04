import { View, StyleSheet, Text } from "react-native";
import { SvgXml } from "react-native-svg";

import { getContrastTextColor } from "../utils/Color";

const HEIGHT = 35;
const WIDTH = (HEIGHT / 133) * 405;
const FONTSIZE = 0.3 * HEIGHT;

const TagIcon = ({ text, fillColor }) => {
	const svgXml =
		'<svg width="48" height="17" viewBox="0 0 48 17" fill="none" xmlns="http://www.w3.org/2000/svg">' +
		'<path d="M1 8.59555L9.53432 1H47V16.1058H9.53432L1 8.59555Z" fill="' +
		fillColor +
		'" stroke="black" stroke-width="0.170686"/>' +
		"</svg>";

	return (
		<View style={styles.container}>
			<SvgXml xml={svgXml} width="100%" height="100%" />
			<Text
				style={[
					styles.text,
					{ color: getContrastTextColor(fillColor) },
				]}
			>
				{text}
			</Text>
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
		width: "70%",
		textAlign: "center",
		position: "absolute",
		fontFamily: "Amaranth",
		fontSize: FONTSIZE,
		top: "30%",
		left: "22%",
		textTransform: "capitalize",
	},
});

export default TagIcon;
