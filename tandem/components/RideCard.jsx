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
	}, [ride_id]);

	const navigation = useNavigation();
	return (
		<TouchableOpacity
			onPress={() => navigation.navigate("SingleRide", { ride })}
			style={styles.card}
		>
			<View style={styles.title}>
				<Text style={styles.title}>{title.toLowerCase()}</Text>
			</View>
			<Text style={styles.description}>{description}</Text>
			<View>
				<TouchableOpacity
					onPress={() =>
						navigation.navigate("UserProfile", { username: author })
					}
				>
					<Text style={styles.authorLink}>{author}</Text>
				</TouchableOpacity>
			</View>
			<Text style={styles.body}>
				{parseDate(ride_date)}
				{"\n"}
				{experience_level} {" / "} {ride_type}
				{"\n"}
				{route_data}
				{"\n"}
				{attendees.length} attending
				{"\n"}
			</Text>
		</TouchableOpacity>
	);

const styles = StyleSheet.create({
	card: {
		backgroundColor: "white",
		marginHorizontal: "5%",
		marginVertical: "5%",
		textAlign: "center",
		borderRadius: 8,
	},
	title: {
		backgroundColor: "#f4511e",
		padding: "3%",
		fontSize: 22,
		fontWeight: "bold",
		color: "#292929",
		textAlign: "center",
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
	},
	description: {
		backgroundColor: "#e8e8e8",
		textAlign: "center",
		paddingHorizontal: "2%",
		paddingVertical: "2%",
	},
	body: {
		textAlign: "center",
		padding: "4%",
		paddingBottom: "1%",
	},
	authorLink: {
		color: "red",
		textAlign: "center",
		backgroundColor: "#e8e8e8",
		paddingBottom: "2%",
	},
});

export default RideCard;
