import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import { RadioButton } from "react-native-paper";
import RideCard from "./RideCard";
import * as API from "../api/api"

export default function OpenRidesList({ route, navigation }) {
	// const { user, userBikeType, userDifficulty } = route.params;
<<<<<<< HEAD
	const [rides, setRides] = useState([]);
	const [bikeValue, setBikeValue] = useState("mountain");
	const [difficulty, setDifficulty] = useState("casual");

	useEffect(()=>{
		API.getAllRides().then((rides) => {
			console.log(rides)
		setRides(rides)})
		}, [])
	
=======
	const [rides, setRides] = useState(rideData);
	const [bike, setBikeFilter] = useState("mountain");
	const [difficulty, setDifficultyFilter] = useState("casual");

>>>>>>> 6531429b43f4ea6153e937bae5389c36831a9f1d
	const list = () => {
		return rides.map((ride) => {
			return (
				<View key={ride.ride_id}>
					<RideCard ride={ride} />
				</View>
			);
		});
	};

<<<<<<< HEAD
=======
	//onValueChange ->
	//fetchFilteredRides(bike, difficulty)

>>>>>>> 6531429b43f4ea6153e937bae5389c36831a9f1d
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
				<View>
					<Text style={styles.filterLabel}>Bike</Text>
					<RadioButton.Group
						style={styles.bike}
						onValueChange={(bike) => setBikeFilter(bike)}
						value={bike}
					>
						<View>
							<Text>Road</Text>
							<RadioButton value="road" />
						</View>
						<View>
							<Text>Mountain</Text>
							<RadioButton value="mountain" />
						</View>
						<View>
							<Text>All</Text>
							<RadioButton value="all" />
						</View>
					</RadioButton.Group>
				</View>
				<View style={styles.difficulty}>
					<Text style={styles.filterLabel}>Difficulty</Text>

					<RadioButton.Group
						onValueChange={(difficulty) => setDifficultyFilter(difficulty)}
						value={difficulty}
					>
						<View>
							<Text style={styles.difficulty}>Casual</Text>
							<RadioButton value="casual" />
						</View>
						<View>
							<Text style={styles.difficulty}>Challenging</Text>
							<RadioButton value="challenging" />
						</View>
						<View>
							<Text style={styles.difficulty}>Hardcore</Text>
							<RadioButton value="hardcore" />
						</View>
					</RadioButton.Group>
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
		flexDirection: "row",
		width: "100%",
		height: "25%",
		justifyContent: "space-around",
	},
	filterLabel: {
		fontWeight: "bold",
	},
	bike: { flexDirection: "row" },
	difficulty: {},
});
