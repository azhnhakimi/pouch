import { View, Text, StyleSheet } from "react-native";

import HeaderText from "../components/HeaderText";
import TransactionPanel from "../components/TransactionPanel";
import AddNewPanel from "../components/AddNewPanel";
import CustomPieChart from "../components/CustomPieChart";

const SpendingsScreen = () => {
	return (
		<View style={styles.container}>
			<HeaderText text={"Transaction"} />
			<View style={styles.panelContainer}>
				<TransactionPanel />
				<TransactionPanel />
				<TransactionPanel />
				<TransactionPanel />
				<AddNewPanel text={"Add New Transaction"} />
			</View>
			<HeaderText text={"Data"} />
			<CustomPieChart />
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
	},
	panelContainer: {
		marginTop: 20,
		marginBottom: 20,
		width: "100%",
	},
});

export default SpendingsScreen;
