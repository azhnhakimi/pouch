import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

const CustomInputField = ({
	headerText,
	height,
	isFocused,
	handleFocus,
	handleBlur,
	onChangeText,
	text,
}) => {
	return (
		<View
			style={[
				styles.container,
				{ height: height },
				isFocused && styles.focused,
			]}
		>
			<TextInput
				multiline
				onFocus={handleFocus}
				onBlur={handleBlur}
				style={[styles.input, isFocused && styles.textFocused]}
				onChangeText={onChangeText}
				value={text}
			/>
			<Text style={[styles.text, , isFocused && styles.textFocused]}>
				{headerText}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		borderColor: "#C9C9C9",
		borderWidth: 1,
	},
	input: {
		paddingHorizontal: 20,
		paddingVertical: 15,
		fontFamily: "Roboto",
		height: "100%",
		textAlignVertical: "top",
		fontSize: 16,
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
		paddingVertical: 0,
	},
	focused: {
		borderColor: "#000000",
		borderWidth: 1,
	},
	textFocused: {
		color: "#000000",
	},
});

export default CustomInputField;
