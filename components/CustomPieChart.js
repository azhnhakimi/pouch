import { View, Text, StyleSheet } from "react-native";
import { PieChart } from "react-native-gifted-charts";

import PieInnerComp from "./PieInnerComp";
import PieLegend from "./PieLegend";

const CustomPieChart = () => {
	const data = [
		{ value: 15, color: "#800080" },
		{ value: 30 },
		{ value: 26 },
		{ value: 40 },
		{ value: 15 },
		{ value: 30 },
		{ value: 26 },
		{ value: 40 },
		{ value: 26 },
		{ value: 40 },
	];
	return (
		<View style={styles.container}>
			<View style={styles.pieChartContainer}>
				<PieChart
					data={data}
					radius={75}
					strokeWidth={2}
					strokeColor="#000000"
					innerRadius={50}
					innerCircleColor={"#ffffff"}
					centerLabelComponent={PieInnerComp}
					// backgroundColor="pink"
				/>
			</View>

			<View style={styles.legendContainer}>
				<PieLegend />
				<PieLegend />
				<PieLegend />
				<PieLegend />
				<PieLegend />
				<PieLegend />
				<PieLegend />
				<PieLegend />
				<PieLegend />
				<PieLegend />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	legendContainer: {
		height: "100%",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: 5,
	},
	pieChartContainer: {
		height: "100%",
		justifyContent: "center",
	},
});

export default CustomPieChart;
