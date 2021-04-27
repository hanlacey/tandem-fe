import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import { Switch } from "react-native-paper";
import RideCard from "./RideCard";
import * as API from "../api/api";

export default function OpenRidesList({ route, navigation }) {
	const [rides, setRides] = useState([]);
	const [mountainRides, showMountainRides] = useState(true);
	const [roadRides, showRoadRides] = useState(false);
	const [beginnerRides, showBeginnerRides] = useState(false);
	const [intermediateRides, showIntermediateRides] = useState(true);
	const [advancedRides, showAdvancedRides] = useState(false);

	//build api request
	API.getAllRides();

	useEffect(() => {
		API.getAllRides().then((rides) => {
			setRides(rides);
		});
	}, [rides]);

	const list = () => {
		return rides.map((ride) => {
			return (
				<View key={ride.ride_id}>
					<RideCard ride={ride} />
				</View>
			);
		});
	};
	const toggleMountainRides = () => {
		showMountainRides(!mountainRides);
	};
	const toggleRoadRides = () => {
		showRoadRides(!roadRides);
	};

	const toggleBeginnerRides = () => {
		showBeginnerRides(!beginnerRides);
	};
	const toggleIntermediateRides = () => {
		showIntermediateRides(!intermediateRides);
	};
	const toggleAdvancedRides = () => {
		showAdvancedRides(!advancedRides);
	};
	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.createRide}
				onPress={() => {
					navigation.navigate("PostRide");
				}}
			>
				<Text style={{ textAlign: "center" }}>Create ride</Text>
			</TouchableOpacity>

			<ScrollView style={styles.scrollContainer}>
				<View style={styles.filter}>
					<View style={styles.toggle}>
						<Switch
							style={styles.switch}
							color={"#292929"}
							value={beginnerRides}
							onValueChange={toggleBeginnerRides}
						/>
						<Text>Beginner</Text>
						<Switch
							style={styles.switch}
							color={"#292929"}
							value={intermediateRides}
							onValueChange={toggleIntermediateRides}
						/>
						<Text>Intermediate</Text>
						<Switch
							style={styles.switch}
							color={"#292929"}
							value={advancedRides}
							onValueChange={toggleAdvancedRides}
						/>
						<Text>Advanced</Text>
					</View>
					<View style={styles.toggle}>
						<Switch
							style={styles.switch}
							color={"#e86b3a"}
							value={mountainRides}
							onValueChange={toggleMountainRides}
						/>
						<Text>Mountain bike </Text>
						<Switch
							style={styles.switch}
							color={"#e86b3a"}
							value={roadRides}
							onValueChange={toggleRoadRides}
						/>
						<Text>Road bike </Text>
					</View>
				</View>
				{list()}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 7,
		marginTop: "5%",
		width: "100%",
		height: "100%",
		alignContent: "center",
		justifyContent: "center",
	},
	createRide: {
		backgroundColor: "white",
		padding: "5%",
		margin: "5%",
		marginBottom: "10%",
	},
	filter: {
		backgroundColor: "white",
		alignContent: "center",
		padding: "5%",
		textAlign: "center",
	},
	toggle: {
		padding: "3%",
		margin: "3%",
		flexDirection: "row",
		justifyContent: "space-evenly",
		textAlign: "center",
	},
});
