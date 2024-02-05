import { View, StyleSheet, TouchableOpacity } from "react-native";

import CalendarIcon from "./CalendarIcon";
import CalendarDetails from "./CalendarDetails";
import TagIcon from "./TagIcon";

const TransactionPanel = () => {
	return (
		<TouchableOpacity style={styles.container}>
			<View style={styles.topHalf}>
				<CalendarIcon text={"25"} />
				<CalendarDetails
					mainText={"RM 20.20"}
					subText={"Very expensive dinner"}
				/>
			</View>
			<View style={styles.bottomHalf}>
				<TagIcon text={"Personal Care"} fillColor={"#ffffff"} />
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
