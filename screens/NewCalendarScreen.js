import { View, Text, StyleSheet } from "react-native";

const NewCalendarScreen = () => {
	return (
		<View style={styles.container}>
			<Text>New Calendar Screen</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		backgroundColor: "pink",
	},
});

export default NewCalendarScreen;
