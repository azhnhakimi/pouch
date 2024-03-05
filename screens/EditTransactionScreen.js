import { useState, useEffect, useRef } from "react";
import {
	View,
	TouchableWithoutFeedback,
	StyleSheet,
	Keyboard,
} from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getDatabase, ref, child, get, set, update } from "firebase/database";
import AlertPro from "react-native-alert-pro";

import {
	getMonthIndex,
	getMonthName,
	sortInMonthTransactions,
} from "../utils/DataFormat";
import { firebaseDatabase } from "../firebaseConfig";

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
	const [inMonthTransactionsArr, setinMonthTransactionsArr] = useState([]);
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
		showMode("date");
	};

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
		alertProRef.current.open();
	};

	const handleConfirmDeleteTransaction = () => {
		const dbRef = ref(getDatabase());
		const monthYearStr = `${getMonthName(passedInMonth)}${passedInYear}`;
		get(
			child(dbRef, `transactions/${monthYearStr}/inMonthTransactions`)
		).then((snapshot) => {
			if (snapshot.exists()) {
				const data = sortInMonthTransactions(snapshot.val());
				const transactionToBeRemoved = data.splice(
					transactionIndex,
					1
				)[0];
				set(
					ref(
						firebaseDatabase,
						`transactions/${monthYearStr}/inMonthTransactions`
					),
					data
				);

				// update total amount
				let currentTotalAmount = 0;
				data.forEach((transaction) => {
					currentTotalAmount =
						currentTotalAmount + parseInt(transaction.amount);
				});
				set(
					ref(
						firebaseDatabase,
						`transactions/${monthYearStr}/totalAmount`
					),
					currentTotalAmount
				);

				// update total tags
				get(
					child(dbRef, `transactions/${monthYearStr}/tagTotals`)
				).then((snapshot) => {
					const tagTotalsData = snapshot.val();
					let tagKey = transactionToBeRemoved.tag.toLowerCase();
					if (tagKey === "personal care") {
						tagKey = "personalCare";
					}
					const tagToBeUpdatedCurrentValue = parseInt(
						tagTotalsData[tagKey]
					);
					const newTagValue =
						tagToBeUpdatedCurrentValue -
						parseInt(transactionToBeRemoved.amount);
					const tempoRef = getDatabase();
					update(
						ref(tempoRef, `transactions/${monthYearStr}/tagTotals`),
						{
							[tagKey]: newTagValue,
						}
					).catch((error) => console.log(error + "flag 2"));
				});
			}
		});

		alertProRef.current.close();
		navigation.goBack();
	};

	const handleSaveBtn = () => {};

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
				<AlertPro
					ref={alertProRef}
					onConfirm={() => handleConfirmDeleteTransaction()}
					onCancel={() => alertProRef.current.close()}
					title="Delete Confirmation"
					message={`Are you sure to delete this transaction? `}
					textCancel="Cancel"
					textConfirm="Delete"
					customStyles={alertProStyles}
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