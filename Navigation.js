import { Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CalendarScreen from "./screens/CalendarScreen";
import CollectorScreen from "./screens/CollectorScreen";
import NewCalendarScreen from "./screens/NewCalendarScreen";
import SpendingsScreen from "./screens/SpendingsScreen";
import TopBarComp from "./components/TopBarComp";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

function StackGroup() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="tabgroup"
				component={TabGroup}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="newcalendarscreen"
				component={NewCalendarScreen}
			/>
			<Stack.Screen name="SpendingsScreen" component={SpendingsScreen} />
		</Stack.Navigator>
	);
}

function TabGroup() {
	return (
		<Tab.Navigator
			tabBarPosition="bottom"
			initialRouteName="transactions"
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
				},
			})}
		>
			<Tab.Screen name="transactions" component={CalendarScreen} />
			<Tab.Screen name="debts" component={CollectorScreen} />
		</Tab.Navigator>
	);
}

const Navigation = () => {
	return (
		<NavigationContainer>
			<StackGroup />
		</NavigationContainer>
	);
};

export default Navigation;
