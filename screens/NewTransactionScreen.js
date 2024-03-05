import { useState } from "react";
import {
	View,
	StyleSheet,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { showMessage } from "react-native-flash-message";
import {
	getDatabase,
	ref,
	child,
	get,
	set,
	onValue,
	update,
} from "firebase/database";

import { getMonthIndex, isValidNumericValue } from "../utils/DataFormat";
import { firebaseDatabase } from "../firebaseConfig";

import HeaderText from "../components/HeaderText";
import CustomInputField from "../components/CustomInputField";
import CustomPicker from "../components/CustomPicker";
import SaveBtn from "../components/SaveBtn";
import CustomDatePicker from "../components/CustomDatePicker";

const NewTransactionScreen = () => {
	const route = useRoute();
	const monthYear = route.params?.monthYear;
	const currentMonth = monthYear.slice(0, -4);
	const currentYear = monthYear.slice(-4);

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

	const navigation = useNavigation();

	const [focusedInput, setFocusedInput] = useState("");
	const [amount, setAmount] = useState("");
	const [tag, setTag] = useState("Food");
	const [comments, setComments] = useState("");
	const [date, setDate] = useState(new Date());
	const [displayText, setDisplayText] = useState("");

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate;

		const day = currentDate.getUTCDate().toString().padStart(2, "0");
		const month = (currentDate.getUTCMonth() + 1)
			.toString()
			.padStart(2, "0");
		const year = currentDate.getUTCFullYear();

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
				currentYear,
				getMonthIndex(currentMonth) + 1,
				0
			),
			minimumDate: new Date(currentYear, getMonthIndex(currentMonth), 1),
		});
	};

	const showDatepicker = () => {
		showMode("date");
	};

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

		const dbRef = ref(getDatabase());
		get(child(dbRef, `transactions/${monthYear}/inMonthTransactions`))
			.then((snapshot) => {
				if (snapshot.exists()) {
					const intMonthTransactionsArr = snapshot.val();
					const newTransaction = {
						date: displayText,
						amount: Number(amount).toFixed(2),
						tag: tag,
						comments: comments.trim(),
					};
					intMonthTransactionsArr.push(newTransaction);

					let currentTotalAmount = 0;
					intMonthTransactionsArr.forEach((transaction) => {
						const transactionAmount = Number(transaction.amount);
						currentTotalAmount =
							currentTotalAmount + transactionAmount;
					});
					set(
						ref(
							firebaseDatabase,
							`transactions/${monthYear}/totalAmount`
						),
						currentTotalAmount
					);
					set(
						ref(
							firebaseDatabase,
							`transactions/${monthYear}/inMonthTransactions`
						),
						intMonthTransactionsArr
					);
				} else {
					const intMonthTransactionsArr = [];
					const newTransaction = {
						date: displayText,
						amount: Number(amount).toFixed(2),
						tag: tag,
						comments: comments.trim(),
					};
					intMonthTransactionsArr.push(newTransaction);
					set(
						ref(
							firebaseDatabase,
							`transactions/${monthYear}/totalAmount`
						),
						newTransaction.amount
					);
					set(
						ref(
							firebaseDatabase,
							`transactions/${monthYear}/inMonthTransactions`
						),
						intMonthTransactionsArr
					);
				}
			})
			.catch((error) => {
				console.error(error);
			});

		get(child(dbRef, `transactions/${monthYear}/tagTotals`))
			.then((snapshot) => {
				const tagTotalsData = snapshot.val();
				let tagKey = tag.toLowerCase();
				if (tagKey === "personal care") {
					tagKey = "personalCare";
				}
				let currentTagAmount = parseInt(tagTotalsData[tagKey]);
				currentTagAmount = currentTagAmount + parseInt(amount);

				const tempoRef = getDatabase();

				update(ref(tempoRef, `transactions/${monthYear}/tagTotals`), {
					[tagKey]: currentTagAmount,
				})
					.then(() => {
						showMessage({
							message: "Success",
							description: "New transaction successfully added!",
							type: "default",
							backgroundColor: "#198754",
						});
					})
					.catch((error) => {
						console.log(error);
						console.log("flag1");
					});
			})
			.catch((error) => console.log(error));

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

export default NewTransactionScreen;
