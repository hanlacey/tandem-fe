import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, RadioButton } from "react-native-paper";
import { DatePicker } from "./DatePicker";

export default function PostRide() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [route, setRoute] = useState("");
	return (
		<View style={styles.input}>
			<TextInput
				style={styles.text}
				label="Enter a title"
				mode="outlined"
				onChangeText={(text) => setTitle(text)}
				value={title}
			/>
			<TextInput
				style={styles.text}
				label="Enter a description"
				mode="outlined"
				onChangeText={(text) => setDescription(text)}
				value={description}
			/>
			<DatePicker />
			<TextInput
				style={styles.text}
				label="Strava route ID"
				mode="outlined"
				onChangeText={(text) => setRoute(text)}
				value={description}
			/>
		</View>
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
