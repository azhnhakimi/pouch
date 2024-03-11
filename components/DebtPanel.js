import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

import DebtDetails from "./DebtDetails";

const DebtPanel = ({ onPress, name, comments, amount }) => {
	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<View style={styles.leftHalf}>
				<DebtDetails name={name} comments={comments} />
			</View>
			<View style={styles.rightHalf}>
				<Text style={styles.text}>{`RM ${amount}`}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		minHeight: 70,
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		borderBottomColor: "#E8E8E8",
		borderBottomWidth: 1,
		paddingBottom: 5,
		paddingHorizontal: 15,
	},
	text: {
		fontSize: 18,
		fontFamily: "AnekBangla",
	},
	leftHalf: {
		justifyContent: "center",
		flex: 3,
	},

	rightHalf: {
		justifyContent: "center",
		alignItems: "flex-end",
		flex: 2,
	},
});

export default DebtPanel;
