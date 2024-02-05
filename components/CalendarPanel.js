import { View, StyleSheet, TouchableOpacity } from "react-native";

import CalendarIcon from "./CalendarIcon";
import CalendarDetails from "./CalendarDetails";
import CalendarSummary from "./CalendarSummary";

const CalendarPanel = () => {
	return (
		<TouchableOpacity style={styles.container}>
			<View style={styles.topHalf}>
				<CalendarIcon text={"FEB"} />
				<CalendarDetails mainText={"February"} subText={"2024"} />
			</View>
			<View style={styles.bottomHalf}>
				<CalendarSummary
					mainText={"Total Amount Spent"}
					subText={"RM 69.69"}
				/>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		height: 70,
		borderBottomColor: "#E8E8E8",
		borderBottomWidth: 1,
		paddingBottom: 5,
	},
	topHalf: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		gap: 10,
		// backgroundColor: "red",
	},
	bottomHalf: {
		// backgroundColor: "yellow",
	},
});

export default CalendarPanel;
