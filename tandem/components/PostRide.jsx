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
import MapView, { Marker, Polyline } from "react-native-maps";

import {formatPolylineData} from "../utils/formatPolylineData"

import * as api from "../api/api";

import userData from "../assets/userData"

export default function PostRide({ route, navigation }) {

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
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<ScrollView style={styles.input}>
			
				<Text>{"\n"}Select one from your Strava routes or create a new route</Text>
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
