import { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";

import { getShortMonthName } from "../utils/TextFormat";

import CalendarIcon from "./CalendarIcon";
import CalendarDetails from "./CalendarDetails";
import CalendarSummary from "./CalendarSummary";

const CalendarPanel = ({ monthYear, totalAmount }) => {
	const { navigate } = useNavigation();

	const [yearStr, setYearStr] = useState("");
	const [monthStr, setMonthStr] = useState("");

	useEffect(() => {
		setYearStr(monthYear.substring(monthYear.length - 4));
		setMonthStr(monthYear.substring(0, monthYear.length - 4));
	}, []);

	if (monthStr === "" || yearStr === "") {
		return (
			<View
				style={{
					height: 70,
					width: "100%",
					borderBottomColor: "#E8E8E8",
					borderBottomWidth: 1,
					paddingBottom: 5,
				}}
			>
				<LottieView
					source={require("../assets/loadingSkeloton.json")}
					autoPlay={true}
					loop={true}
					style={{ width: 200, height: 70 }}
				/>
			</View>
		);
	}

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() =>
				navigate("InnerTransactionStack", {
					screen: "SpendingsScreen",
					params: {
						yearStr: yearStr,
						monthStr: monthStr,
						monthYear: monthYear,
					},
				})
			}
		>
			<View style={styles.topHalf}>
				<CalendarIcon text={getShortMonthName(monthStr)} />
				<CalendarDetails mainText={monthStr} subText={yearStr} />
			</View>
			<View style={styles.bottomHalf}>
				<CalendarSummary
					mainText={"Total Amount Spent"}
					subText={totalAmount}
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
		flex: 1,
	},
	bottomHalf: {
		flex: 1,
	},
});

export default CalendarPanel;
