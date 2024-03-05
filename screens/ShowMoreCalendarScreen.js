import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { ref, onValue } from "firebase/database";

import { firebaseDatabase } from "../firebaseConfig";
import { sortArrayToMonthYear } from "../utils/DataFormat";

import CalendarPanel from "../components/CalendarPanel";

const ShowMoreCalendarScreen = () => {
	const [data, setData] = useState([]);

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

	return (
		<View style={styles.container}>
			{data.length !== 0 &&
				data.map((monthlyTransaction) => (
					<CalendarPanel
						key={monthlyTransaction.monthYear}
						monthYear={monthlyTransaction.monthYear}
						totalAmount={monthlyTransaction.totalAmount}
					/>
				))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		backgroundColor: "#ffffff",
	},
});

export default ShowMoreCalendarScreen;
