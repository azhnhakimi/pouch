import { View, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

import CalendarPanel from "../components/CalendarPanel";

const ShowMoreCalendarScreen = () => {
	const route = useRoute();
	const yearMonthData = route.params?.data;
	return (
		<View style={styles.container}>
			{yearMonthData &&
				yearMonthData.map((monthlyTransaction) => (
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
