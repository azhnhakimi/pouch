import { View, Text, StyleSheet } from "react-native";
import { BarChart } from "react-native-gifted-charts";

import TopBarLabel from "./TopBarLabel";

const CustomBarChart = () => {
	const barData = [
		{
			value: 15,
			label: "Mar",
			topLabelComponent: TopBarLabel,
		},
		{ value: 30, label: "Apr", topLabelComponent: TopBarLabel },
		{ value: 26, label: "May", topLabelComponent: TopBarLabel },
		{ value: 40, label: "Jun", topLabelComponent: TopBarLabel },
		{ value: 15, label: "Jul", topLabelComponent: TopBarLabel },
		{ value: 30, label: "Aug", topLabelComponent: TopBarLabel },
		{ value: 26, label: "Sep", topLabelComponent: TopBarLabel },
		{ value: 40, label: "Oct", topLabelComponent: TopBarLabel },
		{ value: 15, label: "Nov", topLabelComponent: TopBarLabel },
		{ value: 30, label: "Dec", topLabelComponent: TopBarLabel },
		{ value: 26, label: "Jan", topLabelComponent: TopBarLabel },
		{ value: 40, label: "Feb", topLabelComponent: TopBarLabel },
	];
	return (
		<View style={styles.container}>
			<BarChart
				height={150}
				data={barData}
				barWidth={12}
				yAxisThickness={0}
				yAxisLabelWidth={0}
				spacing={15}
				xAxisLabelTextStyle={styles.xAxisText}
				hideRules={true}
				disablePress={true}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// backgroundColor: "pink",
		flex: 1,
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	xAxisText: {
		fontFamily: "Amaranth",
		fontSize: 12,
	},
});

export default CustomBarChart;
