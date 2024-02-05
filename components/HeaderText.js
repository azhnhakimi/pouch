import { View, Text, StyleSheet } from "react-native";

const HeaderText = ({ text }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{text}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
	},
	text: {
		fontFamily: "Amaranth",
		fontSize: 20,
		textTransform: "uppercase",
		textAlign: "left",
	},
});

export default HeaderText;
