import { View, Text, StyleSheet } from "react-native";

const TopBarLabel = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>69</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "200%",
		height: 30,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontSize: 12,
		color: "#ADADAD",
	},
});

export default TopBarLabel;
