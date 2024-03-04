import { View, StyleSheet, TouchableOpacity } from "react-native";

import { getLegendColor } from "../utils/Color";

import CalendarIcon from "./CalendarIcon";
import CalendarDetails from "./CalendarDetails";
import TagIcon from "./TagIcon";

const TransactionPanel = ({ date, amount, tag, comments }) => {
	return (
		<TouchableOpacity style={styles.container}>
			<View style={styles.topHalf}>
				<CalendarIcon text={date} />
				<CalendarDetails mainText={`RM ${amount}`} subText={comments} />
			</View>
			<View style={styles.bottomHalf}>
				<TagIcon text={tag} fillColor={getLegendColor(tag)} />
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

export default TransactionPanel;
