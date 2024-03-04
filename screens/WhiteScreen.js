import { View, StyleSheet } from "react-native";

const WhiteScreen = () => {
	return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		backgroundColor: "#ffffff",
	},
});

export default WhiteScreen;
