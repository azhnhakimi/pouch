import { StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const dimension = 80;

const AddCollectorBtn = ({ onPress }) => {
	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<AntDesign name="plus" size={45} color="black" />
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
		borderWidth: 3,
		borderColor: "#000000",
	},
});

export default AddCollectorBtn;
