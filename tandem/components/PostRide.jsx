import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as api from "../api/api";

export default function PostRide({ navigation }) {
	const [user, setUser] = useState({
		username: "hannah123",
		password: null,
		email: null,
		avatar_url:
			"https://d3nn82uaxijpm6.cloudfront.net/assets/avatar/athlete/large-800a7033cc92b2a5548399e26b1ef42414dd1a9cb13b99454222d38d58fd28ef.png",
		first_name: "hannah",
		last_name: "lacey",
		location: "Manchester, United Kingdom",
		routes_data: "",
		bike_type: null,
		rider_level: null,
	});

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [route_data, setRouteData] = useState("");
	const [date, setDate] = useState(new Date());
	const [experience_level, setExperienceLevel] = useState("");
	const [ride_type, setRideType] = useState("");
	const [location, setLocation] = useState("");

	const newRide = {
		author: user.username,
		ride_date: date,
		route_data,
		ride_type,
		title,
		description,
		experience_level,
		location,
	};
	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setDate(currentDate);
	};
	const handleSubmit = () => {
		api.postRide(newRide).then((newRide) => {
			navigation.navigate("SingleRide", { ride: newRide });
		});
	};
	return (
		<View style={styles.input}>
			<TextInput
				style={styles.text}
				label="Enter a title"
				mode="outlined"
				onChangeText={(text) => setTitle(text)}
				value={title}
			/>
			<TextInput
				style={styles.text}
				label="Enter a description"
				mode="outlined"
				onChangeText={(text) => setDescription(text)}
				value={description}
			/>
			<DateTimePicker
				style={styles.container}
				value={date}
				mode={"datetime"}
				is24Hour={true}
				display="compact"
				onChange={onChange}
			/>
			<TextInput
				style={styles.text}
				label="Strava route ID"
				mode="outlined"
				onChangeText={(text) => setRouteData(text)}
				value={route_data}
			/>
			<RNPickerSelect
				onValueChange={(value) => setRideType(value)}
				items={[
					{ label: "Mountain", value: "mountain" },
					{ label: "Road", value: "road" },
					{ label: "Any", value: "any" },
				]}
			/>
			<RNPickerSelect
				onValueChange={(value) => setExperienceLevel(value)}
				items={[
					{ label: "Beginner", value: "beginner" },
					{ label: "Intermediate", value: "intermediate" },
					{ label: "Advanced", value: "advanced" },
				]}
			/>
			<RNPickerSelect
				onValueChange={(value) => setLocation(value)}
				items={[
					{ label: "Manchester", value: "Manchester" },
					{ label: "London", value: "London" },
					{ label: "Chester", value: "Chester" },
					{ label: "Sheffield", value: "Sheffield" },
				]}
			/>
			<Button onPress={handleSubmit}>
				<Text>Submit</Text>
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
	},
	input: {
		paddingHorizontal: "5%",
		paddingVertical: "5%",
	},
	text: {
		marginVertical: "2%",
	},
});
