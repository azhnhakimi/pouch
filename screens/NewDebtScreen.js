import { useState } from "react";
import {
	View,
	StyleSheet,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";

import { firebaseDatabase } from "../firebaseConfig";
import { isValidNumericValue } from "../utils/DataFormat";

import HeaderText from "../components/HeaderText";
import CustomInputField from "../components/CustomInputField";
import SaveBtn from "../components/SaveBtn";

const NewDebtScreen = () => {
	const navigation = useNavigation();

	const [focusedInput, setFocusedInput] = useState("");
	const [name, setName] = useState("");
	const [amount, setAmount] = useState("");
	const [comments, setComments] = useState("");

	const handleInputFieldFocus = (fieldName) => {
		setFocusedInput(fieldName);
	};

	const handleInputFieldBlur = (fieldName) => {
		if (fieldName != focusedInput) {
			setFocusedInput(null);
			Keyboard.dismiss();
		}
	};

	const handleSave = () => {
		if (
			name.trim() === "" ||
			amount.trim() === "" ||
			comments.trim() === ""
		) {
			showMessage({
				message: "Error",
				description: "Do not leave empty fields!",
				type: "default",
				backgroundColor: "#DC2127",
			});
			return;
		} else if (!isValidNumericValue(amount)) {
			showMessage({
				message: "Error",
				description: "Enter a valid numeric value for amount!",
				type: "default",
				backgroundColor: "#DC2127",
			});
			return;
		}

		const dbRef = ref(getDatabase());
		get(child(dbRef, "debts"))
			.then((snapshot) => {
				if (!snapshot.exists()) {
					const debtsArr = [];

					const newDebt = {
						name: name,
						amount: parseFloat(parseFloat(amount).toFixed(2)),
						comments: comments.trim(),
					};
					debtsArr.push(newDebt);
					set(ref(firebaseDatabase, "debts"), debtsArr);
				} else {
					const debtsArr = snapshot.val();
					const newDebt = {
						name: name,
						amount: parseFloat(parseFloat(amount).toFixed(2)),
						comments: comments.trim(),
					};
					debtsArr.push(newDebt);
					set(ref(firebaseDatabase, "debts"), debtsArr);
				}
				showMessage({
					message: "Success",
					description: "Debt has been created!",
					type: "default",
					backgroundColor: "#198754",
				});
			})
			.catch((error) => {
				showMessage({
					message: "Error",
					description: error,
					type: "default",
					backgroundColor: "#DC2127",
				});
			});

		navigation.goBack();
	};

	return (
		<TouchableWithoutFeedback
			onPress={() => handleInputFieldBlur("blurAll")}
		>
			<View style={styles.container}>
				<View style={styles.upperHalf}>
					<HeaderText text={"Debt Details"} />
					<CustomInputField
						headerText={"Name"}
						height={50}
						isFocused={focusedInput === "name"}
						handleFocus={() => handleInputFieldFocus("name")}
						handleBlur={() => handleInputFieldBlur("name")}
						onChangeText={setName}
						text={name}
						numeric={false}
					/>
					<CustomInputField
						headerText={"Amount"}
						height={50}
						isFocused={focusedInput === "amount"}
						handleFocus={() => handleInputFieldFocus("amount")}
						handleBlur={() => handleInputFieldBlur("amount")}
						onChangeText={setAmount}
						text={amount}
						numeric={true}
					/>
					<CustomInputField
						headerText={"Comments"}
						height={300}
						isFocused={focusedInput === "comments"}
						handleFocus={() => handleInputFieldFocus("comments")}
						handleBlur={() => handleInputFieldBlur("comments")}
						onChangeText={setComments}
						text={comments}
						numeric={false}
					/>
				</View>
				<View>
					<SaveBtn handleOnPress={handleSave} />
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		paddingBottom: 40,
		paddingTop: 20,
		justifyContent: "space-between",
		backgroundColor: "#ffffff",
	},
	upperHalf: {
		gap: 35,
	},
});

export default NewDebtScreen;
