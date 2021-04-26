import * as React from "react";
import { Card, Paragraph, TextInput } from "react-native-paper";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import CommentList from "./CommentList"
import parseDate from "../utils/parseDate";
const ride = {
	author: "raofRides",
	ride_date: 1612329163389,
	route_data: "Manchester",
	ride_type: "road",
	title: "Manchester loop",
	description: "anyone want to join me on a loop around manchester",
	experience_level: "intermediate",
	created_at: 1601324163389,
	votes: 0,
};

export default function SingleRide({ route }) {
	const [text, setText] = React.useState("");
	const { ride } = route.params;
	return (
		<View>
			<Card style={styles.container}>
				<Card.Title
					title={ride.route_data}
					subtitle={parseDate(ride.ride_date)}
				/>
				{/* <Text style={styles.commentContainer}>By {ride.author}</Text> */}
				<Card.Content>{/* <Title>{ride.route_data}</Title> */}</Card.Content>
				<Card.Cover source={{ uri: "https://picsum.photos/700" }} />
				<Card.Content>
					<Paragraph style={styles.rideType}>
						Ride Type: {ride.ride_type}
					</Paragraph>
					<Paragraph style={styles.rideType}>
						Experience Level: {ride.experience_level}
					</Paragraph>
					<Paragraph>{ride.description}</Paragraph>
				</Card.Content>
				<Card.Actions>
					<TouchableOpacity style={styles.button}>
						<Paragraph>Ok</Paragraph>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button}>
						<Paragraph>Cancel</Paragraph>
					</TouchableOpacity>
				</Card.Actions>
			</Card>
			<View style={styles.commentContainer}>
				<Text>Make a comment</Text>
				<TextInput
					label="write.."
					value={text}
					style={styles.commentBox}
					onChangeText={(text) => setText(text)}
				/>
				<CommentList/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 30,
		marginTop: 20,
		marginVertical: 10,
	},
	commentContainer: {
		marginTop: 20,
		marginHorizontal: 30,
	},
	commentBox: {
		height: 100,
	},
	button: {
		color: "white",
		fontWeight: "bold",
		height: 35,
		justifyContent: "center",
		alignItems: "center",
		width: 100,
		marginHorizontal: 30,
		borderRadius: 30,
		backgroundColor: "#FF4500",
		shadowColor: "black",
		shadowOpacity: 0.2,
		shadowOffset: {
			height: 1,
			width: -2,
		},
		elevation: 2,
	},
	rideType: {
		textDecorationLine: "underline",
	},
});
