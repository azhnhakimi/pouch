import { View, Text, StyleSheet } from "react-native";

const TopBarComp = ({ routeName, focused }) => {
	return (
		<Text style={[styles.text, { color: focused ? "#000000" : "#E8E8E8" }]}>
			{routeName}
		</Text>
	);
};

const styles = StyleSheet.create({
	text: {
		color: "#000000",
		fontFamily: "Amiko",
		fontSize: 14,
		textTransform: "uppercase",
	},
});

export default TopBarComp;
