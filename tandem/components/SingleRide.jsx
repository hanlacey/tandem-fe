import * as React from "react";
import { StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Card, Paragraph, TextInput } from "react-native-paper";
import CommentList from "./CommentList"
import * as API from "../api/api"
import parseDate from "../utils/parseDate";
import { formatPolylineData } from "../utils/formatPolylineData"

import rides from "../assets/rides"

export default function SingleRide({ route }) {
	// const [text, setText] = React.useState("");
	// const [attendees, setAttendees] = React.useState([]);
	// const { ride } = route.params;


//  React.useEffect(()=>{
// 		API.getAttendeesByRideId(ride.ride_id).then((attendees) => {
// 		setAttendees(attendees)})
// 		}, [ride.ride_id])
	const formattedMapData = formatPolylineData(ride.route_data)

	const { formattedCoords,
        startLatLng,
        startLatitude,
        startLongitude,
        endLatLng,
        endLatitude,
		endLongitude } = formattedMapData


	return (
		<ScrollView>
			<MapView
				style={styles.map}
				initialRegion={{
				latitude: startLatitude,
				longitude: startLongitude,
				latitudeDelta: 0.0822,
				longitudeDelta: 0.0421,
				}}
			>
				<Marker title="Start" coordinate={startLatLng} pinColor="green" />

				<Marker title="End" coordinate={endLatLng} pinColor="red" />

				<Polyline
				coordinates={formattedCoords}
				strokeColor="#FF0000"
				strokeWidth={3}
				/>
			</MapView>


			<Card style={styles.container}>
				<Card.Title
					title={ride.title}
					subtitle={parseDate(ride.ride_date)}
				/>
				<Card.Cover source={{ uri: "https://picsum.photos/700" }} />
				<Card.Content>
					<Paragraph style={styles.rideType}>
						Distance: {ride.distanceInKm}km
					</Paragraph>
					<Paragraph style={styles.rideType}>
						Attendees: {ride.attendees.length}
					</Paragraph>
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
						<Paragraph>Join</Paragraph>
					</TouchableOpacity>
				</Card.Actions>
			</Card>
			<ScrollView style={styles.commentContainer}>
				<Text style={{fontWeight: "bold"}}>Make a comment</Text>
				<TextInput
					label="write.."
					// value={text}
					style={styles.commentBox}
					onChangeText={(text) => setText(text)}
				/>
				<CommentList ride ={ride}/>
			</ScrollView>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 30,
		marginTop: 20,
	},
	commentContainer: {
		marginTop: 20,
		marginHorizontal: 30,
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

	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height / 2,
  	}
});
