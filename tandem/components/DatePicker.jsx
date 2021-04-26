import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export const DatePicker = () => {
	const [date, setDate] = useState(new Date());
	// const [show, setShow] = useState(false);

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setDate(currentDate);
	};

	return (
		<View>
			<DateTimePicker
				style={styles.container}
				testID="dateTimePicker"
				value={date}
				mode={"datetime"}
				is24Hour={true}
				display="compact"
				onChange={onChange}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignContent: "center",
		justifyContent: "space-around",
		padding: "10%",
	},
});
