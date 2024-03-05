import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { ref, onValue } from "firebase/database";
import { useRoute } from "@react-navigation/native";

import { firebaseDatabase } from "../firebaseConfig";
import { getDate } from "../utils/TextFormat";
import { sortInMonthTransactions } from "../utils/DataFormat";

import TransactionPanel from "../components/TransactionPanel";

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
			if (snapshot.exists()) {
				const retrievedData = snapshot.val();
				setinMonthTransactions(retrievedData);
			} else {
				setinMonthTransactions([]);
			}
		});
	}, []);

	return (
		<View style={styles.container}>
			{inMonthTransactions.length !== 0
				? sortInMonthTransactions(inMonthTransactions).map(
						(transaction, index) => (
							<TransactionPanel
								key={index}
								amount={transaction.amount}
								date={getDate(transaction.date)}
								tag={transaction.tag}
								comments={transaction.comments}
								fullDate={transaction.date}
							/>
						)
				  )
				: null}
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

export default ShowMoreTransactionScreen;
