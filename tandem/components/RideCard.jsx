import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Button, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import parseDate from "../utils/parseDate";
import * as API from "../api/api";

function RideCard({ ride, route }) {
	const [attendees, setAttendees] = useState([]);
	const {
		ride_id,
		title,
		author,
		ride_date,
		route_data,
		ride_type,
		description,
		experience_level,
		created_at,
	} = ride;

	useEffect(() => {
		API.getAttendeesByRideId(ride_id).then((attendees) => {
			setAttendees(attendees);
		});
	}, [ride_id, attendees]);

	const navigation = useNavigation();
	return (
		<TouchableOpacity
			onPress={() => navigation.navigate("SingleRide", { ride })}
			style={styles.card}
		>
			<View style={styles.title}>
				<Text style={styles.title}>
					{title ? title.toLowerCase() : `${author}'s ride`}
				</Text>
			</View>
			<Text style={styles.description}>{description}</Text>
			<View>
				<TouchableOpacity
					onPress={() =>
						navigation.navigate("UserProfile", { username: author })
					}
				>
					<Text style={styles.authorLink}>Posted by: {author}</Text>
				</TouchableOpacity>
			</View>
			<Text style={styles.body}>
				{parseDate(ride_date)}
				{"\n"}
				Ride Type {"&"} Level: {ride_type} {" / "} {experience_level}
				{"\n"}
				{attendees.length} Attending
				{"\n"}
			</Text>
		</TouchableOpacity>
	);
}
const styles = StyleSheet.create({
	card: {
		backgroundColor: "#fffafa",
		// marginHorizontal: "5%",
		marginBottom: "5%",
		textAlign: "center",
		borderRadius: 10,
		shadowColor: "black",
		shadowOpacity: 0.2,
		shadowOffset: {
			height: 1,
			width: -2,
		},
		elevation: 2,
	},
	title: {
		backgroundColor: "#e86b3a",
		padding: "2%",
		fontSize: 22,
		fontWeight: "bold",
		color: "#292929",
		textAlign: "center",
		borderRadius: 10,
		borderBottomRightRadius: 0,
		borderBottomLeftRadius: 0,
	},
	description: {
		textAlign: "center",
		paddingHorizontal: "2%",
		paddingVertical: "2%",
		color: "#292929",
	},
	body: {
		textAlign: "center",
		padding: "4%",
		paddingBottom: "1%",
	},
	authorLink: {
		color: "#bd3500",
		textAlign: "center",
		paddingBottom: "2%",
	},
});

export default RideCard;
