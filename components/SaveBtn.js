import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	handleOnPress,
} from "react-native";

const SaveBtn = ({ handleOnPress }) => {
	return (
		<TouchableOpacity style={styles.container} onPress={handleOnPress}>
			<Text style={styles.text}>SAVE</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#000000",
		width: "100%",
		padding: 10,
	},
	text: {
		color: "#ffffff",
		fontFamily: "Roboto",
		fontSize: 16,
		textAlign: "center",
	},
});

export default SaveBtn;
