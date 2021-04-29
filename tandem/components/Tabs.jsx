import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { profileNav, rideStack, Main } from "./NavStack";

import StravaSignup from "./StravaSignup";
import RideCard from "./RideCard";
import UserProfile from "./UserProfile";
import OpenRidesList from "./OpenRidesList";
import EventAttendees from "./EventAttendees";
import SingleRide from "./SingleRide";
import PostRide from "./PostRide";

const hardcodeProfile = () => <UserProfile username="raofRides" />;
const Tab = createBottomTabNavigator();

export default function Tabs() {
	return (
		<Tab.Navigator
			tabBarOptions={{
				showLabel: true,
				style: { position: "absolute", width: "100%", height: "10%" },
			}}
		>
			<Tab.Screen name="Home" component={Main} />
			<Tab.Screen name="UserProfile" component={hardcodeProfile} />
			<Tab.Screen name="OpenRidesList" component={rideStack} />
		</Tab.Navigator>
	);
}
