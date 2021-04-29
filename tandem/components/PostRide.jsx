import React, { useState } from "react";
import {
	ScrollView,
	Text,
	StyleSheet,
	TouchableWithoutFeedback,
	Keyboard,
	View,
} from "react-native";
import { TextInput, Button, RadioButton } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

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
		route_data: "Route data not available",
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
	const [distanceInKm, setDistance] = useState("");
	const data = [
		{ value: "London" },
		{ value: "Manchester" },
		{ value: "Chester" },
		{ value: "Sheffield" },
	];

	const newRide = {
		author: user.username,
		ride_date: date,
		route_data: user.route_data,
		ride_type,
		title,
		description,
		experience_level,
		location,
		distanceInKm,
	};

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setDate(currentDate);
	};

	const handleSubmit = () => {
		console.log(newRide);
		api.postRide(newRide).then((newRide) => {
			navigation.navigate("SingleRide", { ride: newRide });
		});
	};
	return (
		<View style={styles.container}>
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<ScrollView style={styles.input}>
				<Text style={styles.bold}>Ride Title</Text>
					<TextInput
					placeholder="write a title ..."
					style={styles.text}
					mode="outlined"
					onChangeText={(text) => setTitle(text)}
					value={title}
				/>

				<Text style={styles.bold}>{"\n"}Ride description</Text>
					<TextInput
					placeholder="describe your ride ..."
					style={styles.text}
					mode="outlined"
					multiline={true}
					onChangeText={(text) => setDescription(text)}
					value={description}
				/>
				<Text>{"\n"}Location</Text>
				<Picker
					selectedValue={location}
					onValueChange={(itemValue, itemIndex) => setLocation(itemValue)}
					mode="dropdown"
				>
					<Picker.Item label="London" value="London" />
					<Picker.Item label="Manchester" value="Manchester" />
					<Picker.Item label="Sheffield" value="Sheffield" />
					<Picker.Item label="Chester" value="Chester" />
				</Picker>

				<Text style={styles.bold}>{"\n"}Estimated distance (in km)</Text>
					<TextInput
					placeholder="ride distance ..."
					style={styles.text}
					mode="outlined"
					onChangeText={(text) => setDistance(text)}
					value={distanceInKm}
				/>

				<Text style={styles.bold}>
					{"\n"}Start date and time{"\n"}
				</Text>
				<DateTimePicker
					style={styles.container}
					value={date}
					mode={"datetime"}
					display="default"
					onChange={onChange}
				/>

				<Text style={styles.bold}>{"\n"}Bike Type:</Text>

				<RadioButton.Group
					onValueChange={(ride_type) => setRideType(ride_type)}
					value={ride_type}
				>
					<RadioButton.Item label="Mountain" value="mountain" />
					<RadioButton.Item label="Road" value="road" />
					{/* <RadioButton.Item label="Hybrid" value="hybrid" /> */}
				</RadioButton.Group>

				<Text style={styles.bold}>{"\n"}Experience Level:</Text>

				<RadioButton.Group
					onValueChange={(experience_level) =>
						setExperienceLevel(experience_level)
					}
					value={experience_level}
				>
					<RadioButton.Item label="Beginner" value="beginner" />
					<RadioButton.Item label="Intermediate" value="intermediate" />
					<RadioButton.Item label="Advanced" value="advanced" />
				</RadioButton.Group>

				<Button onPress={handleSubmit}>
					<Text>Create Ride</Text>
					</Button>
			</ScrollView>
		</TouchableWithoutFeedback>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		//flex: 7,
		marginTop: "20%",
		marginBottom: "19%",
		width: "98%",
		//height: "9%",
		alignContent: "center",
		justifyContent: "center",
		// marginHorizontal: 20,
		// marginTop: "15%",
		// height: 700,
		// borderRadius: 5,
		// backgroundColor: "#f5f5f5",
	},
	input: {
		paddingHorizontal: "5%",
		paddingVertical: "0%",
	},
	text: {
		marginVertical: "0%",
	},
	bold: {
		fontWeight: "bold"
	}
});
