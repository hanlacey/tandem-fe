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

import { formatPolylineData } from "../utils/formatPolylineData";

import { Picker } from "@react-native-picker/picker";

import * as api from "../api/api";

import userData from "../assets/userData";

export default function PostRide({ route, navigation }) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
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
	});

	const handleNextButtonPress = () => {
		navigation.navigate("PostRideInfo", { routeSelected, mapData });
	};

	const handleRouteSelection = async (routeSelected) => {
		if (routeSelected !== "" && routeSelected !== "Route title") {
			setRouteData(routeSelected);

			const [routeData] = userData.routes_data.filter((route) => {
				if (route.routeName === routeSelected) {
					return routeSelected;
				}
			});

			const formattedMapData = formatPolylineData(routeData.routePolyline);

			const {
				formattedCoords,
				startLatLng,
				startLatitude,
				startLongitude,
				endLatLng,
				endLatitude,
				endLongitude,
			} = formattedMapData;

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
				routePolyline: routeData.routePolyline,
			});
		} else {
			setRouteData("");

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
			});
		}
	};

	return (
		<View style={styles.container}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<ScrollView style={styles.input}>
					<Text style={styles.select}>
						Select one from your Strava routes or create a new route
					</Text>

					<RadioButton.Group
						onValueChange={(routeSelected) =>
							handleRouteSelection(routeSelected)
						}
						value={routeSelected}
					>
						{userData.routes_data.map((route) => {
							return (
								<RadioButton.Item
									label={route.routeName}
									value={route.routeName}
									key={route.routeName}
								/>
							);
						})}

						<RadioButton.Item label="New route" value="" />
					</RadioButton.Group>

					<Button onPress={() => handleNextButtonPress()}>
						<Text style={{ color: "#292929" }}>Next</Text>
					</Button>
				</ScrollView>
			</TouchableWithoutFeedback>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: "30%",
		padding: 2,
		width: "100%",
		alignContent: "center",
		justifyContent: "center",
		backgroundColor: "#ffffff",
		height: "70%",
	},
	input: {
		paddingHorizontal: "5%",
		paddingVertical: "5%",
	},
	select: {
		backgroundColor: "#e8e8e8",
		padding: "5%",
		fontSize: 14,
		color: "#292929",
		textAlign: "center",
		borderRadius: 10,
	},
});
