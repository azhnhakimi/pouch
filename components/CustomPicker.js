import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

const CustomPicker = () => {
	const [selectedValue, setSelectedValue] = useState("");

	return (
		<View style={styles.container}>
			<Picker
				mode="dropdown"
				selectedValue={selectedValue}
				onValueChange={(itemValue, itemIndex) =>
					setSelectedValue(itemValue)
				}
				style={styles.picker}
				dropdownIconRippleColor={"#D9D9D9"}
			>
				<Picker.Item label="Option 1" value="option1" />
				<Picker.Item label="Option 2" value="option2" />
				<Picker.Item label="Option 3" value="option3" />
			</Picker>
			<Text style={styles.text}>Date</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// backgroundColor: "pink",
		width: "100%",
		height: 50,
		borderColor: "#C9C9C9",
		borderWidth: 1,
		justifyContent: "center",
	},
	picker: {
		width: "100%",
		height: "100%",
		// backgroundColor: "blue",
		color: "#C9C9C9",
	},
	text: {
		position: "absolute",
		left: 15,
		top: -12,
		backgroundColor: "#ffffff",
		paddingHorizontal: 10,
		fontFamily: "Roboto",
		color: "#C9C9C9",
	},
});

export default CustomPicker;
