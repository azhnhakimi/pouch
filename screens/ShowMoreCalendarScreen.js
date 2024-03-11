import { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { ref, onValue } from "firebase/database";

import { firebaseDatabase } from "../firebaseConfig";
import { sortArrayToMonthYear, getTotalAmount } from "../utils/DataFormat";

import CalendarPanel from "../components/CalendarPanel";
import NoCalendarPanel from "../components/NoCalendarPanel";

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
						totalAmount:
							childSnapshot.val().inMonthTransactions === 0
								? 0
								: getTotalAmount(
										childSnapshot.val().inMonthTransactions
								  ),
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
			{data.length !== 0 ? (
				<FlatList
					data={data}
					renderItem={({ item }) => (
						<CalendarPanel
							key={item.monthYear}
							monthYear={item.monthYear}
							totalAmount={item.totalAmount}
						/>
					)}
					showsVerticalScrollIndicator={false}
				/>
			) : (
				<NoCalendarPanel />
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		backgroundColor: "#ffffff",
		justifyContent: "center",
		alignItems: "center",
	},
});

export default ShowMoreCalendarScreen;
