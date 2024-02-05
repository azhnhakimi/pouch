import { View, Text, StyleSheet } from "react-native";

const dimension = 100;
const borderRadius = dimension / 2;

const PieInnerComp = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>TOTAL</Text>
			<Text style={styles.text}>RM 1412.69</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: dimension,
		height: dimension,
		borderRadius: borderRadius,
		backgroundColor: "#ffffff",
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 2,
		borderColor: "#000000",
	},
	text: {
		fontFamily: "AnekBangla",
		fontSize: 16,
	},
});

export default PieInnerComp;
