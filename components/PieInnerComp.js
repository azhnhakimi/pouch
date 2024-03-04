import { View, Text, StyleSheet } from "react-native";

const dimension = 100;
const borderRadius = dimension / 2;

const PieInnerComp = ({ totalAmount }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>TOTAL</Text>
			<Text style={styles.text}>{`RM ${totalAmount}`}</Text>
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
		fontSize: 14,
	},
});

export default PieInnerComp;
