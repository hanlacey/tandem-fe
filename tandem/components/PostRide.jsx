import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { DatePicker } from "./DatePicker";
export default function PostRide() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

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
