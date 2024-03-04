import { View, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

import AddCollectorBtn from "../components/AddCollectorBtn";
import CollectorTile from "../components/CollectorTile";
import HeaderText from "../components/HeaderText";

const CollectorScreen = () => {
	const { navigate } = useNavigation();

	return (
		<View style={styles.container}>
			<HeaderText text={"Collectors"} />
			<View style={styles.tileContainer}>
				<AddCollectorBtn
					onPress={() => navigate("NewCollectorScreen")}
				/>
				<CollectorTile name={"goku"} />
				<CollectorTile name={"goku"} />
				<CollectorTile name={"goku"} />
				<CollectorTile name={"goku"} />
				<CollectorTile name={"goku"} />
				<CollectorTile name={"goku"} />
				<CollectorTile name={"goku"} />
				<CollectorTile name={"goku"} />
				<CollectorTile name={"goku"} />
				<CollectorTile name={"goku"} />
				<CollectorTile name={"goku"} />
				<CollectorTile name={"goku"} />
				<CollectorTile name={"goku"} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		backgroundColor: "#ffffff",
		paddingTop: 30,
	},
	tileContainer: {
		marginTop: 35,
		alignSelf: "center",
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 20,
		width: 280,
	},
});

export default CollectorScreen;
