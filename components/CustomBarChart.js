import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { BarChart } from "react-native-gifted-charts";

import { getShortMonthName } from "../utils/TextFormat";
import { getBarHeight, getLatest12Months } from "../utils/DataFormat";

import TopBarLabel from "./TopBarLabel";

function checkIfMonthYearEntryExist(arrOfObjects, keyToFind) {
	return arrOfObjects.some((obj) => obj.monthYear === keyToFind);
}

function getObjectWithMonthYear(arrOfObjects, keyToFind) {
	return arrOfObjects.find((obj) => obj.monthYear === keyToFind);
}

const CustomBarChart = ({ data }) => {
	const [barData, setBarData] = useState([]);

	useEffect(() => {
		const latest12Months = getLatest12Months();
		const newBarData = latest12Months
			.map((monthYearData) => {
				const monthYear = `${monthYearData.month}${monthYearData.year}`;
				const monthYearTotalAmount = checkIfMonthYearEntryExist(
					data,
					monthYear
				)
					? getObjectWithMonthYear(data, monthYear).totalAmount
					: 0;

				return {
					value: monthYearTotalAmount,
					label: getShortMonthName(monthYearData.month),
					topLabelComponent: () => (
						<TopBarLabel value={Math.floor(monthYearTotalAmount)} />
					),
				};
			})
			.reverse();
		setBarData(newBarData);
	}, [data]);

	return (
		barData && (
			<View style={styles.container}>
				<BarChart
					height={200}
					data={barData}
					barWidth={12}
					yAxisThickness={0}
					yAxisLabelWidth={0}
					spacing={15}
					xAxisLabelTextStyle={styles.xAxisText}
					hideRules={true}
					disablePress={true}
					noOfSections={10}
					maxValue={getBarHeight(data) || 200}
					width={Dimensions.get("window").width}
				/>
			</View>
		)
	);
};

const styles = StyleSheet.create({
	container: {
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
