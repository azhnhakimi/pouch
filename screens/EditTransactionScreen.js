import { useState, useEffect, useRef } from "react";
import {
	View,
	TouchableWithoutFeedback,
	StyleSheet,
	Keyboard,
} from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ref, set, onValue } from "firebase/database";
import { showMessage } from "react-native-flash-message";
import AlertPro from "react-native-alert-pro";

import {
	getMonthIndex,
	getMonthName,
	sortInMonthTransactions,
	isValidNumericValue,
	getTimeStamp,
} from "../utils/DataFormat";
import { firebaseDatabase } from "../firebaseConfig";
import { setUpStatusBar, resetStatusBar } from "../utils/Setup";

import HeaderText from "../components/HeaderText";
import CustomDatePicker from "../components/CustomDatePicker";
import CustomInputField from "../components/CustomInputField";
import CustomPicker from "../components/CustomPicker";
import SaveBtn from "../components/SaveBtn";
import KebabMenu from "../components/KebabMenu";

const EditTransactionScreen = () => {
	const navigation = useNavigation();

	const route = useRoute();
	const fullDate = route.params?.fullDate;
	const passedInYear = route.params?.fullDate.slice(-4);
	const passedInMonth = route.params?.fullDate.slice(3, 5);
	const passedInDate = route.params?.fullDate.slice(0, 2);
	const passedInAmount = route.params?.amount;
	const passedInTag = route.params?.tag;
	const passedInComments = route.params?.comments;
	const transactionIndex = route.params?.keyProp;

	const [inMonthTransactions, setinMonthTransactions] = useState([]);

	const tagValues = {
		Food: "Food",
		Entertainment: "Entertainment",
		Utilities: "Utilities",
		Transport: "Transport",
		Personal_Care: "Personal Care",
		Savings: "Savings",
		Clothing: "Clothing",
		Supplies: "Supplies",
		Subscriptions: "Subscriptions",
		Miscellaneous: "Miscellaneous",
	};

	const alertProRef = useRef(null);
	const [focusedInput, setFocusedInput] = useState("");
	const [amount, setAmount] = useState(passedInAmount);
	const [tag, setTag] = useState(passedInTag);
	const [comments, setComments] = useState(passedInComments);
	const [date, setDate] = useState(
		new Date(
			passedInYear,
			getMonthIndex(getMonthName(passedInMonth)),
			passedInDate
		)
	);
	const [displayText, setDisplayText] = useState(fullDate);

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<KebabMenu
					onPress={handleKebabMenuPress}
					text={"Delete  transaction"}
				/>
			),
		});
		const monthYearStr = `${getMonthName(passedInMonth)}${passedInYear}`;
		const transactionRef = ref(
			firebaseDatabase,
			`transactions/${monthYearStr}/inMonthTransactions`
		);

		onValue(transactionRef, (snapshot) => {
			if (snapshot.exists() && snapshot.val() !== 0) {
				setinMonthTransactions(sortInMonthTransactions(snapshot.val()));
			} else {
				setinMonthTransactions([]);
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

	const handlePickerFocus = () => {
		setFocusedInput("picker");
		Keyboard.dismiss();
	};

	const handlePickerBlur = () => {
		setFocusedInput(null);
	};

	const showDatepicker = () => {
		handleInputFieldBlur("blurAll");
		showMode("date");
	};

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate;

		const day = currentDate.getDate().toString().padStart(2, "0");
		const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
		const year = currentDate.getFullYear();

		const formattedDate = `${day}/${month}/${year}`;

		setDate(currentDate);
		setDisplayText(formattedDate);
	};

	const showMode = (currentMode) => {
		DateTimePickerAndroid.open({
			value: date,
			onChange,
			mode: currentMode,
			is24Hour: true,
			maximumDate: new Date(
				passedInYear,
				getMonthIndex(getMonthName(passedInMonth)) + 1,
				0
			),
			minimumDate: new Date(
				passedInYear,
				getMonthIndex(getMonthName(passedInMonth)),
				1
			),
		});
	};

	const handleKebabMenuPress = () => {
		setUpStatusBar();
		alertProRef.current.open();
	};

	const handleConfirmDeleteTransaction = () => {
		setinMonthTransactions(inMonthTransactions.splice(transactionIndex, 1));
		const monthYearStr = `${getMonthName(passedInMonth)}${passedInYear}`;
		const transactionRef = ref(
			firebaseDatabase,
			`transactions/${monthYearStr}/inMonthTransactions`
		);
		if (inMonthTransactions.length === 0) {
			set(transactionRef, 0);
		} else {
			set(transactionRef, inMonthTransactions);
		}

		showMessage({
			message: "Success",
			description: "Transaction has been deleted!",
			type: "default",
			backgroundColor: "#198754",
		});
		resetStatusBar();

		alertProRef.current.close();
		navigation.goBack();
	};

	const handleSaveBtn = () => {
		if (
			displayText.trim() === "" ||
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

		inMonthTransactions.splice(transactionIndex, 1);
		const updatedTransactionObject = {
			date: displayText,
			timestamp: getTimeStamp(displayText),
			amount: parseFloat(parseFloat(amount).toFixed(2)),
			tag: tag,
			comments: comments.trim(),
		};
		inMonthTransactions.push(updatedTransactionObject);

		const monthYearStr = `${getMonthName(passedInMonth)}${passedInYear}`;
		const transactionRef = ref(
			firebaseDatabase,
			`transactions/${monthYearStr}/inMonthTransactions`
		);
		set(transactionRef, inMonthTransactions);

		showMessage({
			message: "Success",
			description: "Transaction has been updated!",
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
					<HeaderText text={"Transaction Details"} />
					<CustomDatePicker
						text={"Date"}
						onPress={showDatepicker}
						displayText={displayText}
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
					<CustomPicker
						values={tagValues}
						handleFocus={handlePickerFocus}
						handleBlur={handlePickerBlur}
						isFocused={focusedInput === "picker"}
						text={"Tag"}
						selectedValue={tag}
						setSelectedValue={setTag}
					/>
					<CustomInputField
						headerText={"Comments"}
						height={200}
						isFocused={focusedInput === "comments"}
						handleFocus={() => handleInputFieldFocus("comments")}
						handleBlur={() => handleInputFieldBlur("comments")}
						onChangeText={setComments}
						text={comments}
					/>
				</View>
				<View>
					<SaveBtn handleOnPress={handleSaveBtn} />
				</View>
				<AlertPro
					ref={alertProRef}
					onConfirm={() => {
						handleConfirmDeleteTransaction();
					}}
					onClose={() => resetStatusBar()}
					onCancel={() => alertProRef.current.close()}
					title="Delete Confirmation"
					message={`Are you sure to delete this transaction? `}
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
		paddingBottom: 40,
		paddingTop: 20,
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

export default EditTransactionScreen;
