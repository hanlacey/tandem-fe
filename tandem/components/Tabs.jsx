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

const hardcodeProfile = () => <UserProfile username="rollingDan" />;
const Tab = createBottomTabNavigator();

export default function Tabs() {
	return (
		<Tab.Navigator
			tabBarOptions={{
				showLabel: false,
				style: {
					position: "absolute",
					right: 10,
					padding: 10,
					paddingBottom: 25,
					backgroundColor: "#ffffff",
					borderRadius: 15,
					height: 70,
					width: "100%",
				},
				showLabel: true,
			}}
		>
			<Tab.Screen
				name="StravaSignup"
				component={StravaSignup}
				options={{
					tabBarLabel: "Home",
					tabBarIcon: ({ focused }) => (
						<View>
							<Image
								source={require("../assets/tab-icons/sign.png")}
								resizeMode="contain"
								style={{
									width: 30,
									height: 30,
									tintColor: focused ? "#e86b3a" : "#748c94",
								}}
							/>
						</View>
					),
				}}
			/>
			<Tab.Screen
				name="UserProfile"
				component={hardcodeProfile}
				options={{
					tabBarLabel: "Profile",

					tabBarIcon: ({ focused }) => (
						<View>
							<Image
								source={require("../assets/tab-icons/user.png")}
								resizeMode="contain"
								style={{
									width: 30,
									height: 30,
									tintColor: focused ? "#e86b3a" : "#748c94",
								}}
							/>
						</View>
					),
				}}
			/>

			<Tab.Screen
				name="Post a ride"
				component={PostRide}
				options={{
					tabBarLabel: "New ride",

					tabBarIcon: ({ focused }) => (
						<View>
							<Image
								source={require("../assets/tab-icons/plus.png")}
								resizeMode="contain"
								style={{
									width: 30,
									height: 30,
									tintColor: focused ? "#e86b3a" : "#748c94",
								}}
							/>
						</View>
					),
				}}
			/>
			<Tab.Screen
				name="Rides"
				component={rideStack}
				options={{
					tabBarLabel: "Rides",

					tabBarIcon: ({ focused }) => (
						<View>
							<Image
								source={require("../assets/tab-icons/bike.png")}
								resizeMode="contain"
								style={{
									width: 30,
									height: 30,
									tintColor: focused ? "#e86b3a" : "#748c94",
								}}
							/>
						</View>
					),
				}}
			/>
		</Tab.Navigator>
	);
}
