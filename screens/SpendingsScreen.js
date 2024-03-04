import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ref, onValue, getDatabase, set } from "firebase/database";
import { showMessage } from "react-native-flash-message";
import AlertPro from "react-native-alert-pro";

import { firebaseDatabase } from "../firebaseConfig";
import { getDate } from "../utils/TextFormat";
import { sortInMonthTransactions } from "../utils/DataFormat";

import WhiteScreen from "./WhiteScreen";
import HeaderText from "../components/HeaderText";
import TransactionPanel from "../components/TransactionPanel";
import AddNewPanel from "../components/AddNewPanel";
import CustomPieChart from "../components/CustomPieChart";
import KebabMenu from "../components/KebabMenu";

const SpendingsScreen = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const yearStr = route.params?.yearStr;
	const monthStr = route.params?.monthStr;
	const monthYear = route.params?.monthYear;

	const [inMonthTransactions, setinMonthTransactions] = useState([]);

	useEffect(() => {
		navigation.setOptions({
			headerTitle: `${monthStr}, ${yearStr}`,
			headerTitleAlign: "center",
			headerTitleStyle: {
				fontFamily: "Amaranth",
				fontSize: 20,
			},
			headerRight: () => <KebabMenu onPress={handleKebabMenuPress} />,
		});

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

	const handleNewTransaction = () => {
		navigation.navigate("NewTransactionScreen", { monthYear });
	};

	const handleKebabMenuPress = () => {
		this.AlertPro.open();
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
				this.AlertPro.close();
				navigation.goBack();
			})
			.catch((error) => {
				showMessage({
					message: "Error",
					description: error,
					type: "default",
					backgroundColor: "#DC2127",
				});
				this.AlertPro.close();
			});
	};

	return (
		<View style={styles.container}>
			<HeaderText text={"Transactions"} />
			<View style={styles.panelContainer}>
				{inMonthTransactions.length !== 0 &&
					sortInMonthTransactions(inMonthTransactions)
						.slice(0, 3)
						.map((data, index) => (
							<TransactionPanel
								key={index}
								amount={data.amount}
								date={getDate(data.date)}
								tag={data.tag}
								comments={data.comments}
							/>
						))}
				<AddNewPanel
					text={"Add New Transaction"}
					handleOnPress={handleNewTransaction}
				/>
			</View>

			<HeaderText text={"Data"} />
			<CustomPieChart monthYear={monthYear} />
			<AlertPro
				ref={(ref) => {
					this.AlertPro = ref;
				}}
				onConfirm={() => handleConfirmDeleteCalendar()}
				onCancel={() => this.AlertPro.close()}
				title="Delete Confirmation"
				message={`Are you sure to delete this calendar? All data for this month will be lost forever!`}
				textCancel="Cancel"
				textConfirm="Delete"
				customStyles={alertProStyles}
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
