import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import { RadioButton } from "react-native-paper";
import rideData from "../assets/rides";
import RideCard from "./RideCard";

export default function OpenRidesList({ route }) {
	// const { user, userBikeType, userDifficulty } = route.params;
	const [rides, setRides] = useState(rideData);
	const [bikeValue, setBikeValue] = useState("mountain");
	const [difficulty, setDifficulty] = useState("casual");
	const list = () => {
		return rides.map((ride) => {
			return (
				<View key={ride.ride_id}>
					<RideCard ride={ride} />
				</View>
			);
		});
	};

	const handlePress = (value) => {
		console.log(value);
	};

	return (
		<View style={styles.container}>
			<View style={styles.filter}>
				<View>
					<Text style={styles.filterLabel}>Bike</Text>
					<RadioButton.Group
						style={styles.bike}
						onValueChange={(bikeValue) => setBikeValue(bikeValue)}
						value={bikeValue}
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
						onValueChange={(difficulty) => setDifficulty(difficulty)}
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
		flex: 1,
		marginTop: "5%",
		width: "100%",
		height: "100%",
		alignContent: "center",
		justifyContent: "center",
	},
	filterLabel: {
		fontWeight: "bold",
	},
	filter: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-evenly",
	},
	bike: {},
	difficulty: {},
});
