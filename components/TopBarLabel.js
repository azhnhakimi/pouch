import { View, Text, StyleSheet } from "react-native";

const TopBarLabel = ({ value }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{value}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "300%",
		height: 30,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontSize: 12,
		color: "#ADADAD",
		// backgroundColor: "red",
	},
});

export default TopBarLabel;
