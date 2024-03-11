import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { getLegendColor } from "../utils/Color";

import CalendarIcon from "./CalendarIcon";
import CalendarDetails from "./CalendarDetails";
import TagIcon from "./TagIcon";

const TransactionPanel = ({
	date,
	amount,
	tag,
	comments,
	fullDate,
	keyProp,
}) => {
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() =>
				navigation.navigate("EditTransactionScreen", {
					fullDate,
					amount,
					tag,
					comments,
					keyProp,
				})
			}
		>
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
		minHeight: 60,
		borderBottomColor: "#E8E8E8",
		borderBottomWidth: 1,
		paddingVertical: 5,
	},
	topHalf: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		gap: 10,
		flex: 2,
	},
	bottomHalf: {
		alignItems: "flex-end",
		flex: 1,
	},
});

export default TransactionPanel;
