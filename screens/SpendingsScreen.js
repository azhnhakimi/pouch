import { useEffect, useState, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
	ref,
	onValue,
	set,
	orderByChild,
	query,
	limitToFirst,
	limitToLast,
} from "firebase/database";
import { showMessage } from "react-native-flash-message";
import AlertPro from "react-native-alert-pro";

import { firebaseDatabase } from "../firebaseConfig";
import { getDate } from "../utils/TextFormat";
import { sortInMonthTransactions } from "../utils/DataFormat";
import { setUpStatusBar, resetStatusBar } from "../utils/Setup";

import HeaderText from "../components/HeaderText";
import TransactionPanel from "../components/TransactionPanel";
import AddNewPanel from "../components/AddNewPanel";
import CustomPieChart from "../components/CustomPieChart";
import KebabMenu from "../components/KebabMenu";
import ShowMorePrompt from "../components/ShowMorePrompt";
import NoTransactionPanel from "../components/NoTransactionPanel";

const SpendingsScreen = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const yearStr = route.params?.yearStr;
	const monthStr = route.params?.monthStr;
	const monthYear = route.params?.monthYear;

	const [inMonthTransactions, setinMonthTransactions] = useState([]);
	const alertProRef = useRef(null);

	useEffect(() => {
		navigation.setOptions({
			headerTitle: `${monthStr}, ${yearStr}`,
			headerTitleAlign: "center",
			headerTitleStyle: {
				fontFamily: "Amaranth",
				fontSize: 20,
			},
			headerRight: () => (
				<KebabMenu
					onPress={handleKebabMenuPress}
					text={"Delete  calendar"}
				/>
			),
		});

		const transactionsRef = ref(
			firebaseDatabase,
			`transactions/${monthYear}/inMonthTransactions`
		);
		const orderedQuery = query(transactionsRef, orderByChild("timestamp"));
		const limitedOrderedQuery = query(orderedQuery, limitToLast(3));

		onValue(limitedOrderedQuery, (snapshot) => {
			if (snapshot.exists() && snapshot.val() !== 0) {
				// setinMonthTransactions(
				// 	sortInMonthTransactions(snapshot.val()).slice(0, 3)
				// );
				setinMonthTransactions(snapshot.val());
			} else {
				setinMonthTransactions([]);
			}
		});
	}, []);

	const handleNewTransaction = () => {
		navigation.navigate("NewTransactionScreen", { monthYear });
	};

	const handleShowMorePrompt = () => {
		navigation.navigate("ShowMoreTransactionScreen", {
			monthYear,
		});
	};

	const handleKebabMenuPress = () => {
		setUpStatusBar();
		alertProRef.current.open();
	};

	const handleConfirmDeleteCalendar = () => {
		set(ref(firebaseDatabase, "transactions/" + monthYear), null)
			.then(() => {
				showMessage({
					message: "Success",
					description: `Calendar for ${monthStr}, ${yearStr} has been removed!`,
					type: "default",
					backgroundColor: "#198754",
				});
				alertProRef.current.close();
				navigation.goBack();
			})
			.catch((error) => {
				showMessage({
					message: "Error",
					description: error,
					type: "default",
					backgroundColor: "#DC2127",
				});
				alertProRef.current.close();
			});
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<HeaderText text={"Transactions"} />
				<ShowMorePrompt handleOnPress={handleShowMorePrompt} />
			</View>

			<View style={styles.panelContainer}>
				{inMonthTransactions.length !== 0 ? (
					sortInMonthTransactions(inMonthTransactions).map(
						(data, index) => (
							<TransactionPanel
								key={index}
								amount={data.amount.toFixed(2)}
								date={getDate(data.date)}
								tag={data.tag}
								comments={data.comments}
								fullDate={data.date}
								keyProp={index}
							/>
						)
					)
				) : (
					<NoTransactionPanel />
				)}
				<AddNewPanel
					text={"Add New Transaction"}
					handleOnPress={handleNewTransaction}
				/>
			</View>

			<HeaderText text={"Data"} />
			<CustomPieChart monthYear={monthYear} />

			<AlertPro
				ref={alertProRef}
				onConfirm={() => handleConfirmDeleteCalendar()}
				onClose={() => resetStatusBar()}
				onCancel={() => alertProRef.current.close()}
				title="Delete Confirmation"
				message={`Are you sure to delete this calendar? All data for this month will be lost forever!`}
				textCancel="Cancel"
				textConfirm="Delete"
				customStyles={alertProStyles}
				useNativeDriver={true}
			/>
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
		paddingTop: 20,
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

export default SpendingsScreen;
