import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const AddNewPanel = ({ text }) => {
	const { navigate } = useNavigation();

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => navigate("newcalendarscreen")}
		>
			<AntDesign name="plus" size={24} color="black" />
			<Text style={styles.text}>{text}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		width: "100%",
		height: 70,
		justifyContent: "flex-start",
		alignItems: "center",
		gap: 15,
	},
	text: {
		fontFamily: "AnekBangla",
		fontSize: 22,
	},
});

export default AddNewPanel;
