import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

import HeaderText from "../components/HeaderText";
import CalendarPanel from "../components/CalendarPanel";
import AddNewPanel from "../components/AddNewPanel";
import CustomBarChart from "../components/CustomBarChart";

import dataset from "../data/dataset.json";

const CalendarScreen = () => {
	const [data, setData] = useState(null);

	useEffect(() => {
		setData(dataset.data);
	}, []);

	return (
		<View style={styles.container}>
			<HeaderText text={"monthly spendings"} />
			<View style={styles.panelContainer}>
				<CalendarPanel />
				<CalendarPanel />
				<CalendarPanel />
				<AddNewPanel text={"Add New Calendar"} />
			</View>
			<HeaderText text={"history"} />
			<CustomBarChart />
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
});

export default CalendarScreen;
