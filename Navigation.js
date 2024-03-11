import { Dimensions } from "react-native";
import {
	NavigationContainer,
	getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CalendarScreen from "./screens/CalendarScreen";
import NewCalendarScreen from "./screens/NewCalendarScreen";
import SpendingsScreen from "./screens/SpendingsScreen";
import TopBarComp from "./components/TopBarComp";
import NewTransactionScreen from "./screens/NewTransactionScreen";
import ShowMoreCalendarScreen from "./screens/ShowMoreCalendarScreen";
import EditTransactionScreen from "./screens/EditTransactionScreen";
import ShowMoreTransactionScreen from "./screens/ShowMoreTransactionScreen";
import DebtListScreen from "./screens/DebtListScreen";
import NewDebtScreen from "./screens/NewDebtScreen";
import EditDebtScreen from "./screens/EditDebtScreen";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const getRouteName = (route) => {
	const routeName = getFocusedRouteNameFromRoute(route);
	const swipeDisabledRoutes = [
		"NewCalendarScreen",
		"InnerTransactionStack",
		"ShowMoreCalendarScreen",
		"EditTransactionScreen",
		"NewDebtScreen",
		"EditDebtScreen",
	];

	if (routeName && swipeDisabledRoutes.includes(routeName)) {
		return "none";
	}
	return "flex";
};

function InnerTransactionStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerTitleAlign: "center",
				headerTitleStyle: {
					fontFamily: "Amaranth",
					fontSize: 20,
				},
			}}
		>
			<Stack.Screen name="SpendingsScreen" component={SpendingsScreen} />
			<Stack.Screen
				name="NewTransactionScreen"
				component={NewTransactionScreen}
				options={{ title: "New Transaction Menu" }}
			/>
			<Stack.Screen
				name="EditTransactionScreen"
				component={EditTransactionScreen}
				options={{ title: "Edit Transaction Menu" }}
			/>
			<Stack.Screen
				name="ShowMoreTransactionScreen"
				component={ShowMoreTransactionScreen}
				options={{ title: "Transactions List" }}
			/>
		</Stack.Navigator>
	);
}

function DebtStackGroup() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="DebtListScreen"
				component={DebtListScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="NewDebtScreen"
				component={NewDebtScreen}
				options={{
					title: "New Debt Menu",
					headerTitleAlign: "center",
					headerTitleStyle: {
						fontFamily: "Amaranth",
						fontSize: 20,
					},
				}}
			/>
			<Stack.Screen
				name="EditDebtScreen"
				component={EditDebtScreen}
				options={{
					title: "Edit Debt Menu",
					headerTitleAlign: "center",
					headerTitleStyle: {
						fontFamily: "Amaranth",
						fontSize: 20,
					},
				}}
			/>
		</Stack.Navigator>
	);
}

function TransactionStackGroup() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerTitleAlign: "center",
				headerTitleStyle: {
					fontFamily: "Amaranth",
					fontSize: 20,
				},
				animation: "slide_from_bottom",
				animationTypeForReplace: "push",
			}}
		>
			<Stack.Screen
				name="CalendarScreen"
				component={CalendarScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="NewCalendarScreen"
				component={NewCalendarScreen}
				options={{}}
			/>
			<Stack.Screen
				name="InnerTransactionStack"
				component={InnerTransactionStack}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="ShowMoreCalendarScreen"
				component={ShowMoreCalendarScreen}
				options={{ title: "Monthly Spendings List" }}
			/>
		</Stack.Navigator>
	);
}

function TabGroup() {
	return (
		<Tab.Navigator
			tabBarPosition="bottom"
			initialRouteName="Transactions"
			initialLayout={{
				width: Dimensions.get("window").width,
			}}
			screenOptions={({ route }) => ({
				tabBarLabel: ({ focused, color }) => {
					return (
						<TopBarComp routeName={route.name} focused={focused} />
					);
				},
				tabBarIndicatorStyle: {
					backgroundColor: "#000000",
					height: 3,
				},
				swipeEnabled: false,
				tabBarStyle: { display: getRouteName(route) },
			})}
		>
			<Tab.Screen name="Transactions" component={TransactionStackGroup} />
			<Tab.Screen name="Debts" component={DebtStackGroup} />
		</Tab.Navigator>
	);
}

const Navigation = () => {
	return (
		<NavigationContainer>
			<TabGroup />
		</NavigationContainer>
	);
};

export default Navigation;
