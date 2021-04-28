import React, { useState, useEffect, useRef } from "react";
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import { Switch } from "react-native-paper";
import RideCard from "./RideCard";
import * as api from "../api/api";

export default function OpenRidesList({ route, navigation }) {
	// const { userData } = route.params

	// console.log(userData, "*** route.params ***")

	const refHook = useRef(false);
	const [rides, setRides] = useState([]);
	const [mountainRides, setMountainRides] = useState(false);
	const [roadRides, setRoadRides] = useState(false);
	const [beginnerRides, setBeginnerRides] = useState(false);
	const [intermediateRides, setIntermediateRides] = useState(false);
	const [advancedRides, setAdvancedRides] = useState(false);
	// const [filters, setFilters];
	//build api request
	//check status of each toggle
	//if true add to query

	useEffect(() => {
		const allFilters = [
			{ value: "mountain", active: mountainRides, category: "bike_type" },
			{ value: "road", active: roadRides, category: "ride_type" },
			{
				value: "beginner",
				active: beginnerRides,
				category: "experience_level",
			},
			{
				value: "intermediate",
				active: intermediateRides,
				category: "experience_level",
			},
			{
				value: "advanced",
				active: advancedRides,
				category: "experience_level",
			},
		];
		let query = [];
		allFilters.forEach((filter) => {
			if (filter.active === true) {
				query.push(`${filter.category}=${filter.value}`);
			}
		});
		const joinedQuery = query.join("&");
		api.getFilteredRides(joinedQuery).then((rides) => {
			setRides(rides);
		});
	}, [
		mountainRides,
		roadRides,
		beginnerRides,
		intermediateRides,
		advancedRides,
	]);

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
		setMountainRides(!mountainRides);
		setRoadRides(false);
	};
	const toggleRoadRides = () => {
		setRoadRides(!roadRides);
		setMountainRides(false);
	};

	const toggleBeginnerRides = () => {
		setBeginnerRides(!beginnerRides);
		setIntermediateRides(false);
		setAdvancedRides(false);
	};
	const toggleIntermediateRides = () => {
		setIntermediateRides(!intermediateRides);
		setBeginnerRides(false);
		setAdvancedRides(false);
	};
	const toggleAdvancedRides = () => {
		setAdvancedRides(!advancedRides);
		setBeginnerRides(false);
		setIntermediateRides(false);
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.createRide}
				onPress={() => {
					navigation.navigate("PostRide", { userData });
				}}
			>
				<Text style={{ textAlign: "center" }}>Create ride</Text>
			</TouchableOpacity>

			<ScrollView style={styles.scrollContainer}>
				<View style={styles.filter}>
					<Text style={{ textAlign: "center" }}>Filter rides</Text>
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
		flexGrow: 5,
		flexShrink: 5,
		flexDirection: "row",
		justifyContent: "space-around",
	},
	toggle: {
		padding: "3%",
		margin: "3%",
		justifyContent: "space-evenly",
		textAlign: "center",
	},
});
