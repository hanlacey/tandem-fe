import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RadioButton, Button } from "react-native-paper";

export default function RideFilter() {
	const [bikeValue, setBikeValue] = useState("first");
	const [difficultyValue, setDifficultyValue] = useState("casual");
	return (
		<View style={styles.container}>
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
			<RadioButton.Group
				style={styles.difficulty}
				onValueChange={(difficultyValue) => setDifficultyValue(difficultyValue)}
				value={difficultyValue}
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
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "white",
		textAlign: "center",
	},
	difficulty: {
		color: "red",
	},
});
