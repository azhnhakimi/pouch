import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const dimension = 80;

const CollectorTile = ({ name }) => {
	return (
		<TouchableOpacity style={styles.container}>
			<FontAwesome5 name="user-alt" size={24} color="black" />
			<Text numberOfLines={1} style={styles.text}>
				{name}
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		width: dimension,
		height: dimension,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 15,
		borderWidth: 2,
		borderColor: "#000000",
		paddingTop: 10,
		overflow: "hidden",
	},
	text: {
		maxWidth: dimension - 20,
		fontFamily: "AnekBangla",
		textTransform: "capitalize",
		fontSize: 14,
		flexWrap: "nowrap",
	},
});

export default CollectorTile;
