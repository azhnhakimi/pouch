import { useState } from "react";
import {
	TouchableOpacity,
	StyleSheet,
	TouchableHighlight,
	View,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import {
	Menu,
	MenuOptions,
	MenuOption,
	MenuTrigger,
} from "react-native-popup-menu";

const DIMENSIONS = 32;

const KebabMenu = ({ onPress, text }) => {
	return (
		<Menu style={styles.rounded}>
			<MenuTrigger customStyles={menuTriggerStyles}>
				<FontAwesome6
					name="ellipsis-vertical"
					size={18}
					color="black"
				/>
			</MenuTrigger>
			<MenuOptions customStyles={menuOptionsStyles}>
				<MenuOption onSelect={() => onPress()} text={text} />
			</MenuOptions>
		</Menu>
	);
};

const styles = StyleSheet.create({
	rounded: {
		overflow: "hidden",
		width: DIMENSIONS,
		height: DIMENSIONS,
		borderRadius: DIMENSIONS / 2,
	},
});

const menuTriggerStyles = {
	TriggerTouchableComponent: TouchableHighlight,
	triggerWrapper: {
		width: DIMENSIONS,
		height: DIMENSIONS,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: DIMENSIONS / 2,
	},
	triggerTouchable: {
		underlayColor: "#dddddd",
	},
};

const menuOptionsStyles = {
	optionsWrapper: {
		backgroundColor: "#ffffff",
		justifyContent: "center",
		alignItems: "center",
	},
	optionText: {
		fontSize: 18,
		fontFamily: "AnekBangla",
	},
	optionWrapper: {
		backgroundColor: "#ffffff",
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 8,
		paddingBottom: 5,
	},
};

export default KebabMenu;
