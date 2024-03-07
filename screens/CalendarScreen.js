import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ref, onValue } from "firebase/database";
import LottieView from "lottie-react-native";

import { firebaseDatabase } from "../firebaseConfig";
import { sortArrayToMonthYear } from "../utils/DataFormat";

import HeaderText from "../components/HeaderText";
import CalendarPanel from "../components/CalendarPanel";
import AddNewPanel from "../components/AddNewPanel";
import CustomBarChart from "../components/CustomBarChart";
import ShowMorePrompt from "../components/ShowMorePrompt";
import NoCalendarPanel from "../components/NoCalendarPanel";

const CalendarScreen = () => {
	const { navigate } = useNavigation();
	const [data, setData] = useState(null);

	useEffect(() => {
		const transactionRef = ref(firebaseDatabase, "transactions");
		onValue(transactionRef, (snapshot) => {
			if (snapshot.exists()) {
				const monthlyTransactionArray = [];
				snapshot.forEach((childSnapshot) => {
					const monthlyTransaction = {
						monthYear: childSnapshot.key,
						totalAmount: childSnapshot.val().totalAmount,
					};
					monthlyTransactionArray.push(monthlyTransaction);
				});
				setData(monthlyTransactionArray.sort(sortArrayToMonthYear));
			} else {
				setData([]);
			}
		});
	}, []);

	function handleNewCalendar() {
		navigate("NewCalendarScreen");
	}

	function showMoreCalendar() {
		navigate("ShowMoreCalendarScreen");
	}

	if (!data) {
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: "#ffffff",
					justifyContent: "center",
					alignItems: "center",
					width: "100%",
					height: "100%",
				}}
			>
				<LottieView
					source={require("../assets/circularLoader.json")}
					autoPlay={true}
					loop={true}
					style={{ width: 150, height: 150 }}
				/>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<HeaderText text={"monthly spendings"} />
				<ShowMorePrompt handleOnPress={showMoreCalendar} />
			</View>
			<View style={styles.panelContainer}>
				{data && data.length !== 0 ? (
					data
						.slice(0, 3)
						.map((monthlyTransaction) => (
							<CalendarPanel
								key={monthlyTransaction.monthYear}
								monthYear={monthlyTransaction.monthYear}
								totalAmount={monthlyTransaction.totalAmount}
							/>
						))
				) : (
					<NoCalendarPanel />
				)}
				<AddNewPanel
					text={"Add New Calendar"}
					handleOnPress={handleNewCalendar}
				/>
			</View>
			<HeaderText text={"history"} />
			{data && <CustomBarChart data={data} />}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		backgroundColor: "#ffffff",
		justifyContent: "flex-start",
		alignItems: "center",
		paddingTop: 30,
	},
	panelContainer: {
		marginTop: 20,
		marginBottom: 20,
		width: "100%",
	},
	header: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		alignItems: "flex-end",
	},
});

export default CalendarScreen;
