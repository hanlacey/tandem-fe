import React, { Component, useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	TouchableHighlight,
} from "react-native";
import { Button } from "react-native-paper";
// import users from "../assets/users";
// import rideData from "../assets/rides";
import parseDate from "../utils/parseDate";
import * as api from "../api/api";

export default function UserProfile() {
	const [user, setUser] = useState({
		username: "rollingDan",
		password: "abcde3",
		email: "example3@gmail.com",
		avatar_url:
			"https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fdgalywyr863hv.cloudfront.net%2Fpictures%2Fathletes%2F29656122%2F8899811%2F1%2Flarge.jpg",
		first_name: "Daniel",
		last_name: "Stevenson",
		location: "Sheffield",
		routes_data: "",
		bike_type: "Mountain",
		experience_level: "Advanced",
	});
	const [rides, setRides] = useState([]);

	useEffect(() => {
		const userRides = [];
		api.getAllRides().then((rides) => {
			rides.forEach((ride) => {
				api.getAttendeesByRideId(ride.ride_id).then((attendeeInfo) => {
					attendeeInfo.forEach((attendee) => {
						if (attendee.attendee === user.username) {
							api.getRideByRideId(attendee.ride_id).then((ride) => {
								userRides.push(ride);
								console.log(userRides);
							});
						}
					});
				});
			});
		});
		setRides(userRides);
	}, [rides]);

	const userRideList = (props) => {
		return rides.map((ride) => {
			return (
				<View key={ride.ride_id} style={styles.ride}>
					<TouchableHighlight
						onPress={() => {
							navigation.navigate("SingleRide", { ride });
						}}
					>
						<Text>{ride.title}</Text>
					</TouchableHighlight>
					<Text style={styles.rideDescription}>
						{ride.author} - {parseDate(ride.ride_date)} -{" "}
						{/* {ride.attendees.length} riders */}
					</Text>
				</View>
			);
		});
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={styles.headerContent}>
					<Image style={styles.avatar} source={{ uri: user.avatar_url }} />
					<Text style={styles.name}>{user.username} </Text>
					<Text style={styles.userInfo}>
						{user.bike_type} {"bike    /  "} {user.experience_level}
					</Text>
				</View>
			</View>
			<View>
				<Text style={styles.rideListHeader}>
					{user.username}'s active rides
				</Text>
				{userRideList(parseDate)}
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	container: { paddingTop: "15%" },
	header: {
		backgroundColor: "#f2f3f4",
	},
	headerContent: {
		padding: 30,
		alignItems: "center",
	},
	avatar: {
		width: 130,
		height: 130,
		borderRadius: 63,
		borderWidth: 4,
		borderColor: "#e86b3a",
		marginBottom: 10,
	},
	name: {
		fontSize: 22,
		color: "#000000",
		fontWeight: "600",
	},
	userInfo: {
		fontSize: 16,
		color: "#778899",
		fontWeight: "600",
		textAlign: "center",
	},
	rideListHeader: {
		textAlign: "center",
		backgroundColor: "#e86b3a",
		padding: "5%",
		marginBottom: "5%",
	},
	ride: {
		backgroundColor: "white",
		marginHorizontal: "5%",
		marginVertical: "2%",
		paddingHorizontal: "5%",
		paddingVertical: "2%",
		borderRadius: 3,
	},
	rideTitle: {
		color: "red",
	},
	rideDescription: {},
});
