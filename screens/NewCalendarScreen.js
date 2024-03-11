import { useEffect, useState } from "react";
import {
	View,
	StyleSheet,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ref, set, child, get, getDatabase } from "firebase/database";
import { showMessage } from "react-native-flash-message";

import { firebaseDatabase } from "../firebaseConfig";
import { checkDateExceedingCurrent, isValidYear } from "../utils/DataFormat";

import CustomInputField from "../components/CustomInputField";
import CustomPicker from "../components/CustomPicker";
import SaveBtn from "../components/SaveBtn";
import HeaderText from "../components/HeaderText";

const NewCalendarScreen = () => {
	const navigation = useNavigation();
	const [inputFieldFocused, setInputFieldFocused] = useState(false);
	const [pickerFocused, setPickerFocused] = useState(false);
	const [year, setYear] = useState("");
	const [selectedMonth, setSelectedMonth] = useState("January");

	useEffect(() => {
		navigation.setOptions({
			headerTitle: "New Calendar Menu",
		});
	}, []);

	function inputFieldFocus() {
		setInputFieldFocused(true);
	}

	function inputFieldBlur() {
		setInputFieldFocused(false);
		Keyboard.dismiss();
	}

	function pickerFocus() {
		setPickerFocused(true);
		inputFieldBlur();
	}

	function pickerBlur() {
		setPickerFocused(false);
	}

	function handleSaveBtnPress() {
		if (year.trim() === "") {
			showMessage({
				message: "Error",
				description: "Do not leave empty fields!",
				type: "default",
				backgroundColor: "#DC2127",
			});
			return;
		}

		const newPathStr = `${selectedMonth}${year}`;

		const dbRef = ref(getDatabase());
		get(child(dbRef, `transactions/${newPathStr}`))
			.then((snapshot) => {
				if (snapshot.exists()) {
					showMessage({
						message: "Error",
						description: "Calendar already exists!",
						type: "default",
						backgroundColor: "#DC2127",
					});
				} else if (checkDateExceedingCurrent(newPathStr)) {
					showMessage({
						message: "Error",
						description: "Calendar cannot exceed current date!",
						type: "default",
						backgroundColor: "#DC2127",
					});
				} else if (!isValidYear(year)) {
					showMessage({
						message: "Error",
						description: "Please enter a valid year!",
						type: "default",
						backgroundColor: "#DC2127",
					});
				} else {
					set(
						ref(
							firebaseDatabase,
							"transactions/" +
								newPathStr +
								"/inMonthTransactions"
						),
						0
					);

					navigation.navigate("CalendarScreen");
					showMessage({
						message: "Success",
						description: "New calendar successfully created!",
						type: "default",
						backgroundColor: "#198754",
					});
				}
			})
			.catch((error) => {
				navigation.navigate("CalendarScreen");
				showMessage({
					message: "Error",
					description: error,
					type: "default",
					backgroundColor: "#DC2127",
				});
			});
	}

	const values = {
		January: "January",
		February: "February",
		March: "March",
		April: "April",
		May: "May",
		June: "June",
		July: "July",
		August: "August",
		September: "September",
		October: "October",
		November: "November",
		December: "December",
	};

	return (
		<TouchableWithoutFeedback onPress={inputFieldBlur}>
			<View style={styles.container}>
				<View style={styles.upperHalf}>
					<HeaderText text={"Calendar Details"} />
					<CustomInputField
						headerText={"Year"}
						height={50}
						isFocused={inputFieldFocused}
						handleFocus={inputFieldFocus}
						handleBlur={inputFieldBlur}
						onChangeText={setYear}
						text={year}
						numeric={true}
					/>
					<CustomPicker
						values={values}
						handleFocus={pickerFocus}
						handleBlur={pickerBlur}
						isFocused={pickerFocused}
						text={"Month"}
						selectedValue={selectedMonth}
						setSelectedValue={setSelectedMonth}
					/>
				</View>
				<View>
					<SaveBtn handleOnPress={handleSaveBtnPress} />
				</View>
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
		paddingTop: 20,
		paddingBottom: 40,
	},
	upperHalf: {
		gap: 40,
	},
});

export default NewCalendarScreen;
