import { TouchableOpacity, StyleSheet, Text } from "react-native";

const ShowMorePrompt = ({ handleOnPress }) => {
	return (
		<TouchableOpacity onPress={handleOnPress}>
			<Text style={styles.text}>Show More</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	text: {
		fontFamily: "LondrinaSolid",
		textDecorationLine: "underline",
	},
});

export default ShowMorePrompt;
