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

import MapView, { Marker, Polyline } from "react-native-maps";

import {formatPolylineData} from "../utils/formatPolylineData"

import { Picker } from "@react-native-picker/picker";

import * as api from "../api/api";

import userData from "../assets/userData"

export default function PostRide({ route, navigation }) {

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

	const [routeSelected, setRouteData] = useState("Route title");

	const [mapData, setMapData] = useState({
			shouldDisplayMap: false,
			formattedCoords: "",
			startLatLng: "",
			startLatitude: 100,
			startLongitude: 0,
			endLatLng: "",
			endLatitude: "",
			endLongitude: "",	
			distanceInKm: 0,
			routePolyline: "",
		})

	const handleNextButtonPress = () => {
		navigation.navigate("PostRideInfo", {routeSelected, mapData})
	};

	const handleRouteSelection = async (routeSelected) => {
		
		if (routeSelected !== "" && routeSelected !== "Route title") {
			
			setRouteData(routeSelected)
			
			const [routeData] = userData.routes_data.filter((route) => {			
				if (route.routeName === routeSelected) {
					return routeSelected
				}
			})
	
			const formattedMapData = formatPolylineData(routeData.routePolyline)			

			const {
				formattedCoords,
				startLatLng,
				startLatitude,
				startLongitude,
				endLatLng,
				endLatitude,
				endLongitude, 
			} = formattedMapData
	
			await setMapData({
				shouldDisplayMap: true,
				formattedCoords,
				startLatLng,
				startLatitude,
				startLongitude,
				endLatLng,
				endLatitude,
				endLongitude,
				distanceInKm: routeData.distanceInKm.toFixed(0).toString(),
				routePolyline: routeData.routePolyline
			})
		} else {
			setRouteData("")

			setMapData({
				shouldDisplayMap: false,
				formattedCoords: "",
				startLatLng: "",
				startLatitude: 100,
				startLongitude: 0,
				endLatLng: "",
				endLatitude: "",
				endLongitude: "",	
				distanceInKm: "",
			})
		}
	}

	return (
		<View style={styles.container}>
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<ScrollView style={styles.input}>

			
				<Text>{"\n"}Select one from your Strava routes or create a new route</Text>

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
					onValueChange={(routeSelected) => handleRouteSelection(routeSelected)}
					value={routeSelected}
				>

					{userData.routes_data.map((route => {
						return (
							<RadioButton.Item label={route.routeName} value={route.routeName} key={route.routeName}/>
						)
					}))}
					
					<RadioButton.Item label="New route" value="" />
				</RadioButton.Group>

				<Button onPress={() => handleNextButtonPress()}>
					<Text>Next</Text>
				</Button>

				<Text>{"\n\n\n\n"}</Text>
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
