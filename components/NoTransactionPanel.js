import { View, StyleSheet, Text } from "react-native";

const NoTransactionPanel = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>So empty...</Text>
			<Text style={styles.text}>No purchases yet?</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: 60,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontSize: 16,
		fontFamily: "Amiko",
	},
});

export default NoTransactionPanel;
