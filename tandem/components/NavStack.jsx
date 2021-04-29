import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserProfile from "./UserProfile";
import OpenRidesList from "./OpenRidesList";
import EventAttendees from "./EventAttendees";
import SingleRide from "./SingleRide";
import PostRide from "./PostRide";
import RideCard from "./RideCard";
import StravaSignup from "./StravaSignup";
const Stack = createStackNavigator();
const screenOptionStyle = {
	headerStyle: {
		backgroundColor: "#9AC4F8",
	},
	headerTintColor: "white",
	headerBackTitle: "Back",
};
const profileNav = () => {
	return (
		<Stack.Navigator screenOptions={screenOptionStyle}>
			<Stack.Screen name="UserProfile" component={UserProfile} />
		</Stack.Navigator>
	);
};
const rideStack = () => {
	return (
		<Stack.Navigator
			initialRouteName="OpenRidesList"
			screenOptions={screenOptionStyle}
		>
			<Stack.Screen name="OpenRidesList" component={OpenRidesList} />
			<Stack.Screen name="PostRide" component={PostRide} />
			<Stack.Screen name="RideCard" component={RideCard} />
			<Stack.Screen name="SingleRide" component={SingleRide} />
			<Stack.Screen name="EventAttendees" component={EventAttendees} />
		</Stack.Navigator>
	);
};
const Main = () => {
	return (
		<Stack.Navigator screenOptions={screenOptionStyle}>
			<Stack.Screen name="StravaSignup" component={StravaSignup} />
		</Stack.Navigator>
	);
};
export { profileNav, rideStack, Main };
