import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const CustomDatePicker = ({ text, onPress, displayText }) => {
	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<Text style={styles.text}>{text}</Text>
			<Text style={styles.displayText}>{displayText}</Text>
			<AntDesign name="caretdown" size={10} color="#707070" />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		borderWidth: 1,
		borderColor: "#C9C9C9",
		height: 50,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingLeft: 15,
		paddingRight: 20,
	},
	text: {
		position: "absolute",
		left: 15,
		top: -12,
		backgroundColor: "#ffffff",
		paddingHorizontal: 10,
		fontFamily: "Roboto",
		color: "#C9C9C9",
		paddingVertical: 0,
	},
	displayText: {
		color: "#C9C9C9",
		fontSize: 16,
	},
});

export default CustomDatePicker;
