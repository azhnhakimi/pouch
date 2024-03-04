import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { ref, onValue, getDatabase, set } from "firebase/database";

import { getLegendColor } from "../utils/Color";
import { getPieLegendPercentage } from "../utils/DataFormat";
import { firebaseDatabase } from "../firebaseConfig";

import PieInnerComp from "./PieInnerComp";
import PieLegend from "./PieLegend";

const CustomPieChart = ({ monthYear }) => {
	const [totalAmount, setTotalAmount] = useState(0);
	const [pieChartData, setPieChartData] = useState([]);

	useEffect(() => {
		const totalAmountRef = ref(
			firebaseDatabase,
			"transactions/" + monthYear + "/totalAmount"
		);
		const tagTotalsRef = ref(
			firebaseDatabase,
			"transactions/" + monthYear + "/tagTotals"
		);

		onValue(totalAmountRef, (snapshot) => {
			if (snapshot.exists()) {
				setTotalAmount(snapshot.val());
			} else {
				setTotalAmount(0);
			}
		});

		onValue(tagTotalsRef, (snapshot) => {
			if (snapshot.exists()) {
				const pieChartDataArr = [];
				snapshot.forEach((childSnapshot) => {
					const tagObject = {
						value: childSnapshot.val(),
						color: getLegendColor(childSnapshot.key),
						text: childSnapshot.key,
					};
					pieChartDataArr.push(tagObject);
				});
				setPieChartData(pieChartDataArr);
			} else {
				setPieChartData([]);
			}
		});
	}, []);

	if (pieChartData.length === 0) {
		return (
			<View style={styles.errorMessageContainer}>
				<Text style={styles.errorMessageText}>
					Data could not be fetched... &#9785;
				</Text>
			</View>
		);
	} else if (totalAmount === 0) {
		return (
			<View style={styles.errorMessageContainer}>
				<Text style={styles.errorMessageText}>
					No transactions yet? &#9760;
				</Text>
			</View>
		);
	}

	return pieChartData.length !== 0 && totalAmount !== 0 ? (
		<View style={styles.container}>
			<View style={styles.pieChartContainer}>
				<PieChart
					data={pieChartData}
					radius={75}
					strokeWidth={2}
					strokeColor="#000000"
					innerRadius={50}
					innerCircleColor={"#ffffff"}
					centerLabelComponent={() => (
						<PieInnerComp totalAmount={totalAmount.toString()} />
					)}
				/>
			</View>
			<View style={styles.legendContainer}>
				{pieChartData.map(
					(tag) =>
						tag.value !== 0 && (
							<PieLegend
								key={tag.text}
								tag={tag.text}
								value={getPieLegendPercentage(
									totalAmount,
									tag.value
								)}
							/>
						)
				)}
			</View>
		</View>
	) : null;
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
		// backgroundColor: "pink",
	},
	pieChartContainer: {
		height: "100%",
		justifyContent: "center",
	},
	errorMessageContainer: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	errorMessageText: {
		fontFamily: "Amiko",
		fontSize: 18,
	},
});

export default CustomPieChart;
