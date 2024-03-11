import { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ref, onValue, set } from "firebase/database";

import { firebaseDatabase } from "../firebaseConfig";

import HeaderText from "../components/HeaderText";
import DebtPanel from "../components/DebtPanel";
import AddNewPanel from "../components/AddNewPanel";
import NoDebtPanel from "../components/NoDebtPanel";

const DebtListScreen = () => {
	const navigation = useNavigation();

	const [debtsArr, setDebtsArr] = useState([]);

	useEffect(() => {
		const debtsRef = ref(firebaseDatabase, "debts");
		onValue(debtsRef, (snapshot) => {
			if (snapshot.exists()) {
				setDebtsArr(snapshot.val());
			} else {
				setDebtsArr([]);
			}
		});
	}, []);

	const handleAddNewDebt = () => {
		navigation.navigate("NewDebtScreen");
	};
	const handleOnDebtPanelPress = (debtIndex, name, amount, comments) => {
		navigation.navigate("EditDebtScreen", {
			debtIndex,
			name,
			amount,
			comments,
		});
	};

	return (
		<View style={styles.container}>
			<HeaderText text={"Debts List"} />
			<View style={styles.panelContainer}>
				<AddNewPanel
					text={"Add New Debt"}
					handleOnPress={handleAddNewDebt}
				/>
				{debtsArr.length !== 0 ? (
					<FlatList
						data={debtsArr}
						renderItem={({ item, index }) => (
							<DebtPanel
								onPress={() =>
									handleOnDebtPanelPress(
										index,
										item.name,
										parseFloat(item.amount).toFixed(2),
										item.comments
									)
								}
								name={item.name}
								amount={parseFloat(item.amount).toFixed(2)}
								comments={item.comments}
							/>
						)}
						showsVerticalScrollIndicator={false}
					/>
				) : (
					<NoDebtPanel />
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		backgroundColor: "#ffffff",
		paddingTop: 30,
		justifyContent: "flex-start",
		alignItems: "center",
		paddingBottom: 10,
	},
	header: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		alignItems: "flex-end",
	},
	panelContainer: {
		marginTop: 20,
		marginBottom: 20,
		width: "100%",
		flex: 1,
	},
});

export default DebtListScreen;
