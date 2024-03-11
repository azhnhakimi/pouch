import { View, StyleSheet, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

const CustomPicker = ({
	values,
	handleFocus,
	handleBlur,
	isFocused,
	text,
	selectedValue,
	setSelectedValue,
}) => {
	return (
		<View style={[styles.container, isFocused && styles.focused]}>
			<Picker
				selectedValue={selectedValue}
				onValueChange={(itemValue, itemIndex) =>
					setSelectedValue(itemValue)
				}
				style={styles.picker}
				dropdownIconRippleColor={"#D9D9D9"}
				onFocus={handleFocus}
				onBlur={handleBlur}
			>
				{Object.entries(values).map(([label, value]) => (
					<Picker.Item key={value} label={value} value={value} />
				))}
			</Picker>
			<Text style={styles.text}>{text}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: 55,
		borderColor: "#C9C9C9",
		borderWidth: 1,
		justifyContent: "center",
	},
	picker: {
		width: "100%",
		height: "100%",
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
	focused: {
		borderColor: "#000000",
		borderWidth: 1,
	},
});

export default CustomPicker;
