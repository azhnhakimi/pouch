import { View, Text, StyleSheet } from "react-native";

const NoDebtPanel = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>No debts? Looking good!</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#ffffff",
	},
	text: {
		fontFamily: "Amiko",
		fontSize: 18,
	},
});

export default NoDebtPanel;
