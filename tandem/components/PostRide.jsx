import React, { useState } from "react";
import {
	ScrollView,
	Text,
	StyleSheet,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { TextInput, Button, RadioButton } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as api from "../api/api";

export default function PostRide({ route, navigation }) {

	// const { userData } = route.params

	console.log(JSON.parse(userData.routes_data), "*** route.params in PostRide ***")

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
			navigation.navigate("SingleRide", { ride: newRide, userData });
		});
	};
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<ScrollView style={styles.input}>
				<Text>Ride name</Text>
				<TextInput
					style={styles.text}
					mode="outlined"
					onChangeText={(text) => setTitle(text)}
					value={title}
				/>

				<Text>{"\n"}Ride description</Text>
				<TextInput
					style={styles.text}
					mode="outlined"
					multiline={true}
					onChangeText={(text) => setDescription(text)}
					value={description}
				/>

				<Text>{"\n"}Location</Text>
				<TextInput
					style={styles.text}
					mode="outlined"
					onChangeText={(text) => setLocation(text)}
					value={location}
				/>

				<Text>{"\n"}Estimated distance (in km)</Text>
				<TextInput
					style={styles.text}
					mode="outlined"
					onChangeText={(text) => setDistance(text)}
					value={distanceInKm}
				/>

				<Text>
					{"\n"}Start date and time{"\n"}
				</Text>
				<DateTimePicker
					style={styles.container}
					value={date}
					mode={"datetime"}
					display="default"
					onChange={onChange}
				/>

				<Text>{"\n"}Bike type</Text>

				<RadioButton.Group
					onValueChange={(ride_type) => setRideType(ride_type)}
					value={ride_type}
				>
					<RadioButton.Item label="Mountain" value="mountain" />
					<RadioButton.Item label="Road" value="road" />
					<RadioButton.Item label="Hybrid" value="hybrid" />
				</RadioButton.Group>

				<Text>{"\n"}Experience level</Text>

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
					<Text>Create ride</Text>
				</Button>

				<Text>{"\n\n\n\n"}</Text>
			</ScrollView>
		</TouchableWithoutFeedback>
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
