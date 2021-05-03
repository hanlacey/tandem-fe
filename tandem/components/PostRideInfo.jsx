import React, { useState, useEffect } from "react";
import {
	ScrollView,
	Text,
	StyleSheet,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { TextInput, Button, RadioButton } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import MapView, { Marker, Polyline } from "react-native-maps";

import * as api from "../api/api";

import userData from "../assets/userData";

export default function PostRideInfo({ route, navigation }) {
	const { routeSelected, mapData } = route.params;

	// console.log(routeSelected, "in PostRideInfo")
	// console.log(mapData.routePolyline, "routeSelected in PostRideInfo")

	const [user, setUser] = useState({
		username: "rollingDan",
		password: null,
		email: null,
		avatar_url:
			"https://d3nn82uaxijpm6.cloudfront.net/assets/avatar/athlete/large-800a7033cc92b2a5548399e26b1ef42414dd1a9cb13b99454222d38d58fd28ef.png",
		first_name: "Dan",
		last_name: "Stevenson",
		location: "Sheffield",
		route_data: "",
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
	const [distanceInKm, setDistance] = useState(0);

	useEffect(() => {
		// if Strava data being used when component mounts
		// set initial values to ones from Strava

		if (mapData.distanceInKm) {
			setDistance(mapData.distanceInKm);
		}

		if (routeSelected !== "New route") {
			setTitle(routeSelected);
		} else {
			setTitle("");
		}
	});

	const newRide = {
		author: user.username,
		ride_date: date,
		route_data: mapData.routePolyline,
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
		// console.log("Data to POST ---->", newRide);
		api.postRide(newRide).then((newRide) => {
			navigation.navigate("SingleRide", { ride: newRide, userData });
		});
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<ScrollView style={styles.input}>
				{mapData.shouldDisplayMap && (
					<MapView
						style={styles.map}
						initialRegion={{
							latitude: mapData.startLatitude,
							longitude: mapData.startLongitude,
							latitudeDelta: 0.0822,
							longitudeDelta: 0.0421,
						}}
					>
						<Marker
							title="Start"
							coordinate={mapData.startLatLng}
							pinColor="green"
						/>

						<Marker title="End" coordinate={mapData.endLatLng} pinColor="red" />

						<Polyline
							coordinates={mapData.formattedCoords}
							strokeColor="#FF0000"
							strokeWidth={3}
						/>
					</MapView>
				)}

				<Text>Ride name</Text>
				<TextInput
					style={styles.text}
					mode="outlined"
					onChangeText={(text) => setTitle(text)}
					defaultValue={routeSelected}
				/>

				<Text>{"\n"}Ride description</Text>
				<TextInput
					style={styles.text}
					mode="outlined"
					multiline={true}
					onChangeText={(text) => setDescription(text)}
					value={description}
				/>

				<Text>{"\n"}City</Text>
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
					keyboardType="number-pad"
					onChangeText={(text) => setDistance(text)}
					defaultValue={mapData.distanceInKm}
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

				<Text>{"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"}</Text>
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
	map: {
		width: "100%",
		height: "16%",
	},
});
