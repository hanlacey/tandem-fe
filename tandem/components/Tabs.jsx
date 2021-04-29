import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import StravaSignup from "./StravaSignup";
import RideCard from "./RideCard";
import UserProfile from "./UserProfile";
import OpenRidesList from "./OpenRidesList";
import EventAttendees from "./EventAttendees";
import SingleRide from "./SingleRide";
import PostRide from "./PostRide";

const hardcodeProfile = () => <UserProfile username="raofRides" />;
const Tab = createBottomTabNavigator();

// const CustomTabBarButton = (props) => {
// 	console.log(props),
// 		(
// 			<TouchableOpacity
// 				style={{
// 					//top: -10,
// 					//justifyContent: "center",
// 					//alignItems: "center",
// 					...styles.shadow,
// 				}}
// 				onPress={props.onPress}>
// 				<View
// 					style={{
// 						width: 70,
// 						height: 70,
// 						borderRadius: 35,
// 						backgroundColor: "#e32f45",
// 					}}>
// 					{props.children}
// 				</View>
// 			</TouchableOpacity>
// 		)
// }

export default function Tabs() {
	return (
		<Tab.Navigator
			style={styles.navigator}
			tabBarOptions={{
				showLabel: true,
				style: {},
			}}
		>
			{/* <Tab.Screen
				name="Home"
				component={StravaSignup}
				options={{
					title: "Tandem",
					tabBarIcon: ({focused}) => (
						<View
							style={{alignItems: "center", justifyContent: "center", top: 10}}>
							<Image
								source={require("../assets/tab-icons/home.png")}
								resizeMode="contain"
								style={{
									width: 25,
									height: 25,
									tintColor: focused ? "#e32f45" : "#748c94",
								}}
							/>
							<Text
								style={{color: focused ? "#e32f45" : "#748c94", fontSize: 12}}>
								Home
							</Text>
						</View>
					),
				}}
			/> */}
			<Tab.Screen
				name="StravaSignup"
				component={StravaSignup}
				options={{
					tabBarLabel: "Login",
					tabBarIcon: ({ focused }) => (
						<View style={styles.button}>
							<Image
								source={require("../assets/tab-icons/sign.png")}
								resizeMode="contain"
								style={{
									width: 30,
									height: 30,
									tintColor: focused ? "#e32f45" : "#748c94",
								}}
							/>
							{/* <Text
								style={{ color: focused ? "#e32f45" : "#748c94", fontSize: 12 }}
							>
								Sign up
							</Text> */}
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
						<View style={styles.button}>
							<Image
								source={require("../assets/tab-icons/user.png")}
								resizeMode="contain"
								style={{
									width: 30,
									height: 30,
									tintColor: focused ? "#e32f45" : "#748c94",
								}}
							/>
							{/* <Text
								style={{ color: focused ? "#e32f45" : "#748c94", fontSize: 12 }}
							>
								Profile
							</Text> */}
						</View>
					),
				}}
			/>
			{/* <Tab.Screen name="RideCard" component={RideCard} /> */}
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
									tintColor: focused ? "#e32f45" : "#748c94",
								}}
							/>
							{/* <Text
								style={{
									color: focused ? "#e32f45" : "#748c94",
									fontSize: 12,
								}}
							>
								New ride
							</Text> */}
						</View>
					),
				}}
			/>
			<Tab.Screen
				name="OpenRidesList"
				component={OpenRidesList}
				options={{
					tabBarLabel: "Rides",

					tabBarIcon: ({ focused }) => (
						<View style={styles.button}>
							<Image
								source={require("../assets/tab-icons/bike.png")}
								resizeMode="contain"
								style={{
									width: 30,
									height: 30,
									tintColor: focused ? "#e32f45" : "#748c94",
								}}
							/>
							{/* <Text
								style={{
									color: focused ? "#e32f45" : "#748c94",
									fontSize: 12,
								}}
							>
								Rides
							</Text> */}
						</View>
					),
				}}
			/>
			{/* <Tab.Screen name="Event Attendees" component={EventAttendees} />
			<Tab.Screen name="SingleRide" component={SingleRide} /> */}
		</Tab.Navigator>
	);
}

const styles = StyleSheet.create({
	navigator: { justifyContent: "space-evenly" },
	button: { padding: 0 },
	// shadow: {
	// 	shadowColor: "#7F5DF0",
	// 	shadowOffset: {
	// 		width: 0,
	// 		height: 10,
	// 	},
	// 	shadowOpacity: 0.25,
	// 	shadowRadius: 3.5,
	// 	elevation: 5,
	// },
});
