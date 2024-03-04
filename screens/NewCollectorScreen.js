import {
	View,
	StyleSheet,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import CustomInputField from "../components/CustomInputField";
import SaveBtn from "../components/SaveBtn";

const NewCollectorScreen = () => {
	return (
		<TouchableWithoutFeedback>
			<View style={styles.container}>
				<CustomInputField headerText={"Name"} height={50} />
				<SaveBtn />
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		backgroundColor: "#ffffff",
		paddingTop: 30,
		paddingBottom: 20,
		justifyContent: "space-between",
	},
});

export default NewCollectorScreen;
