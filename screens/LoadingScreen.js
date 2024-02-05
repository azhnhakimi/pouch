import { View, Text, StyleSheet } from "react-native";

const LoadingScreen = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>
				Supercalifragilisticexpialidocious...
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ffffff",
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontSize: 18,
	},
});

export default LoadingScreen;
