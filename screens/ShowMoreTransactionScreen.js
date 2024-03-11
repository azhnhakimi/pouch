import { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { ref, onValue } from "firebase/database";
import { useRoute } from "@react-navigation/native";

import { firebaseDatabase } from "../firebaseConfig";
import { getDate } from "../utils/TextFormat";
import { sortInMonthTransactions } from "../utils/DataFormat";

import TransactionPanel from "../components/TransactionPanel";
import NoTransactionPanel from "../components/NoTransactionPanel";

const ShowMoreTransactionScreen = () => {
	const route = useRoute();
	const monthYear = route.params?.monthYear;

	const [inMonthTransactions, setinMonthTransactions] = useState([]);

	useEffect(() => {
		const transactionRef = ref(
			firebaseDatabase,
			`transactions/${monthYear}/inMonthTransactions`
		);
		onValue(transactionRef, (snapshot) => {
			if (snapshot.exists() && snapshot.val() !== 0) {
				const retrievedData = snapshot.val();
				setinMonthTransactions(sortInMonthTransactions(retrievedData));
			} else {
				setinMonthTransactions([]);
			}
		});
	}, []);

	return (
		<View style={styles.container}>
			{inMonthTransactions && inMonthTransactions.length !== 0 ? (
				<FlatList
					data={inMonthTransactions}
					renderItem={({ item, index }) => (
						<TransactionPanel
							amount={item.amount.toFixed(2)}
							date={getDate(item.date)}
							tag={item.tag}
							comments={item.comments}
							fullDate={item.date}
							keyProp={index}
						/>
					)}
					showsVerticalScrollIndicator={false}
				/>
			) : (
				<NoTransactionPanel />
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

export default ShowMoreTransactionScreen;
