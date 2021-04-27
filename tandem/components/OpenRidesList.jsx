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
	const [showMountainRides, setShowMountainRides] = useState(true);
	const [showRoadRides, setShowRoadRides] = useState(true);

	useEffect(() => {
		API.getAllRides().then((rides) => {
			setRides(rides);
		});
	}, []);

	const list = () => {
		return rides.map((ride) => {
			return (
				<View key={ride.ride_id}>
					<RideCard ride={ride} />
				</View>
			);
		});
	};

	const onToggleSwitch = (filter, setFilter) => {
		useEffect(() => {
			setFilter(!filter);
		}, [filter, setFilter]);
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
			<View style={styles.filter}>
				<View style={styles.toggle}>
					<Switch
						color={"#292929"}
						value={showMountainRides}
						onValueChange={onToggleSwitch(
							showMountainRides,
							setShowMountainRides
						)}
					/>
					<Text>Beginner</Text>
				</View>
				<View style={styles.toggle}>
					<Switch
						color={"#292929"}
						value={showRoadRides}
						onValueChange={onToggleSwitch(showRoadRides, setShowRoadRides)}
					/>
					<Text>Intermediate</Text>
				</View>
				<View style={styles.toggle}>
					<Switch
						color={"#292929"}
						value={showRoadRides}
						onValueChange={onToggleSwitch(showRoadRides, setShowRoadRides)}
					/>
					<Text>Advanced</Text>
				</View>
			</View>
			<View style={styles.filter}>
				<View style={styles.toggle}>
					<Switch
						color={"#FF4500"}
						value={showMountainRides}
						onValueChange={onToggleSwitch(
							showMountainRides,
							setShowMountainRides
						)}
					/>
					<Text>Mountain bike</Text>
				</View>
				<View style={styles.toggle}>
					<Switch
						color={"#FF4500"}
						value={showRoadRides}
						onValueChange={onToggleSwitch(showRoadRides, setShowRoadRides)}
					/>
					<Text>Road bike</Text>
				</View>
			</View>
			<ScrollView style={styles.scrollContainer}>{list()}</ScrollView>
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
		flexDirection: "row",
		alignContent: "center",
		justifyContent: "space-evenly",
	},
	toggle: {
		padding: "3%",
	},
});
