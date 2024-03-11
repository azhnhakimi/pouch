import { View, StyleSheet, Text } from "react-native";

const DebtDetails = ({ name, comments }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.nameText}>{name}</Text>
			<Text style={styles.detailsText}>{comments}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
	detailsText: {
		fontSize: 16,
		fontFamily: "Roboto",
	},
	nameText: {
		fontSize: 20,
		fontFamily: "LondrinaSolid",
		paddingBottom: 5,
	},
});

export default DebtDetails;
