import { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import AlertPro from "react-native-alert-pro";
import { ref, set, onValue } from "firebase/database";

import { setUpStatusBar, resetStatusBar } from "../utils/Setup";
import { firebaseDatabase } from "../firebaseConfig";
import { isValidNumericValue } from "../utils/DataFormat";

import KebabMenu from "../components/KebabMenu";
import HeaderText from "../components/HeaderText";
import CustomInputField from "../components/CustomInputField";
import SaveBtn from "../components/SaveBtn";

const EditDebtScreen = () => {
	const navigation = useNavigation();

	const route = useRoute();
	const debtIndex = route.params?.debtIndex;
	const passedInName = route.params?.name;
	const passedInAmount = route.params?.amount;
	const passedInComments = route.params?.comments;

	const alertProRef = useRef(null);
	const [focusedInput, setFocusedInput] = useState("");
	const [debtData, setDebtData] = useState([]);
	const [name, setName] = useState(passedInName);
	const [amount, setAmount] = useState(passedInAmount);
	const [comments, setComments] = useState(passedInComments);

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<KebabMenu
					onPress={handleKebabMenuPress}
					text={"Delete  debt"}
				/>
			),
		});

		const debtRef = ref(firebaseDatabase, "debts");
		onValue(debtRef, (snapshot) => {
			if (snapshot.exists()) {
				setDebtData(snapshot.val());
			} else {
				setDebtData([]);
			}
		});
	}, []);

	const handleInputFieldFocus = (fieldName) => {
		setFocusedInput(fieldName);
	};

	const handleInputFieldBlur = (fieldName) => {
		if (fieldName != focusedInput) {
			setFocusedInput(null);
			Keyboard.dismiss();
		}
	};

	const handleKebabMenuPress = () => {
		setUpStatusBar();
		alertProRef.current.open();
	};

	const handleConfirmDeleteDebt = () => {
		debtData.splice(debtIndex, 1);

		const debtRef = ref(firebaseDatabase, "debts");
		set(debtRef, debtData);
		showMessage({
			message: "Success",
			description: "Debt has been cleared!",
			type: "default",
			backgroundColor: "#198754",
		});
		alertProRef.current.close();
		resetStatusBar();
		navigation.goBack();
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

		debtData.splice(debtIndex, 1);
		const updatedDebt = {
			name: name,
			amount: parseFloat(parseFloat(amount).toFixed(2)),
			comments: comments.trim(),
		};
		debtData.splice(debtIndex, 0, updatedDebt);

		const debtRef = ref(firebaseDatabase, "debts");
		set(debtRef, debtData);

		showMessage({
			message: "Success",
			description: "Debt has been updated!",
			type: "default",
			backgroundColor: "#198754",
		});
		resetStatusBar();

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
				<AlertPro
					ref={alertProRef}
					onConfirm={() => {
						handleConfirmDeleteDebt();
					}}
					onClose={() => resetStatusBar()}
					onCancel={() => alertProRef.current.close()}
					title="Delete Confirmation"
					message={`Are you sure to delete this debt? `}
					textCancel="Cancel"
					textConfirm="Delete"
					customStyles={alertProStyles}
					useNativeDriver={true}
				/>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		justifyContent: "space-between",
		backgroundColor: "#ffffff",
	},
	upperHalf: {
		gap: 35,
	},
});

const alertProStyles = {
	mask: {
		backgroundColor: "'rgba(0, 0, 0, 0.3)'",
		flex: 1,
	},
	container: {
		borderWidth: 1,
		borderColor: "#000000",
		borderStyle: "solid",
	},
	buttonCancel: {
		backgroundColor: "#ffffff",
		borderWidth: 1,
		borderColor: "#000000",
		borderStyle: "solid",
	},
	textCancel: {
		color: "#000000",
	},
	buttonConfirm: {
		backgroundColor: "#DC2127",
	},
	textConfirm: {
		color: "#ffffff",
	},
};

export default EditDebtScreen;
