import React, { useState, useEffect, useRef } from "react";
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import { Switch } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import RideCard from "./RideCard";
import * as api from "../api/api";

export default function OpenRidesList({ route, navigation }) {
	const refHook = useRef(false);

	const [rides, setRides] = useState([]);
	const [mountainRides, setMountainRides] = useState(false);
	const [roadRides, setRoadRides] = useState(false);
	const [beginnerRides, setBeginnerRides] = useState(false);
	const [intermediateRides, setIntermediateRides] = useState(false);
	const [advancedRides, setAdvancedRides] = useState(false);
	const [location, setLocation] = useState("");
	useEffect(() => {
		const allFilters = [
			{ value: "mountain", active: mountainRides, category: "ride_type" },
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
		if (location) {
			query.push(`location=${location}`);
		}
		const joinedQuery = query.join("&");
		console.log(joinedQuery);
		api.getFilteredRides(joinedQuery).then((rides) => {
			setRides(rides);
		});
	}, [
		mountainRides,
		roadRides,
		beginnerRides,
		intermediateRides,
		advancedRides,
		location,
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
				<Text style={{ textAlign: "center" }}>Create Ride</Text>
			</TouchableOpacity>

			<ScrollView style={styles.scrollContainer}>
				<Picker
					selectedValue={location}
					onValueChange={(itemValue, itemIndex) => setLocation(itemValue)}
					mode="dropdown"
					style={styles.picker}
				>
					<Picker.Item label="All" value="" />
					<Picker.Item label="London" value="London" />
					<Picker.Item label="Manchester" value="Manchester" />
					<Picker.Item label="Sheffield" value="Sheffield" />
					<Picker.Item label="Chester" value="Chester" />
				</Picker>
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
				<View style={styles.rides}>{list()}</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 7,
		//marginTop: "-1%",
		marginBottom: "17%",
		width: "100%",
		height: "100%",
		alignContent: "center",
		justifyContent: "center",
	},
	createRide: {
		backgroundColor: "snow",
		padding: "5%",
		margin: "4%",
		marginBottom: "3%",
		borderRadius: 5,
		borderBottomRightRadius: 5,
		borderBottomLeftRadius: 5,
		shadowColor: "black",
		shadowOpacity: 0.2,
		shadowOffset: {
			height: 1,
			width: -2,
		},
		elevation: 2,
	},
	picker: {
		marginHorizontal: "4%",
	},
	filter: {
		backgroundColor: "white",
		alignContent: "center",
		padding: "5%",
		textAlign: "center",
		flexGrow: 5,
		flexShrink: 5,
		marginHorizontal: "4%",
		marginVertical: "1%",
		flexDirection: "row",
		justifyContent: "space-around",
		borderRadius: 5,
	},
	filterLabel: {
		color: "black",
		fontWeight: "bold",
	},
	bike: { flexDirection: "row" },
	difficulty: {},
	rides: {
		margin: "4%",
		marginBottom: "3%",
		borderRadius: 15,
	},
});
