import * as React from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput,
	Dimensions,
	useEffect,
	Button,
	ScrollView,
	KeyboardAvoidingView,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Card, Paragraph } from "react-native-paper";
import CommentList from "./CommentList";
import * as API from "../api/api";
import { useNavigation } from "@react-navigation/native";
import parseDate from "../utils/parseDate";
import { formatPolylineData } from "../utils/formatPolylineData";

export default function SingleRide({ route }) {
	const { ride } = route.params;
	const [attendees, setAttendees] = React.useState([]);
	const [disabled, setDisabled] = React.useState(false);
	const [user, setUser] = React.useState({
		username: "raofRides",
		password: "abcde2",
		email: "example2@gmail.com",
		avatar_url: "http://clipart-library.com/images/yckAgeMRi.jpg",
		first_name: "Raof",
		last_name: "Benaesha",
		location: "Manchester",
		routes_data: "routes",
		bike_type: "Road",
		rider_level: "Beginner",
	});

	const attendee = {
		attendee: user.username,
		ride_id: ride.ride_id,
		name: user.first_name,
	};

	ride.route_data =
		"}xxdI~eaHQb@FTNP~@ZX\\M`@{@|ADHXd@bBTTNXp@A\\HVQb@J|@h@r@JZZBRRN\\|@lAh@jAAtBT~Dx@x@`CJb@bAr@dAdAx@fAnAV`@j@`Bp@rCn@zA\\vA`@~@|@z@hApAdApAzA~Bf@zAD?v@fBzB|G`@f@x@`@d@dA@n@TrBj@dDVhGIrCL|@h@xADZC\\L|BGdC]pDk@~EoAtEq@|@gD~DmBrCCJBXUl@]^e@lAAXYZEz@NlAE`AL~DRtCLz@pArF`DhJn@xBv@zDnBbHrB|IrHzSl@z@tD|D~CbMd@fDLhCTvBFjCH|@p@tCbAjCn@pC`@lA|@bFNtCH`DWlD^hDfAhE`@fCBfAGtCFz@Tp@pAjBPv@jBxO@h@KfCAzDOrCB\\E`CGzB^xET`AK|ACvAm@dBGh@GnA@`DPzBhAxEBhAIf@g@vAO^QNe@pAa@nDYrAWj@{@z@o@^Q\\uAnDU|AFtFr@zGNb@`@^r@dAb@jAAb@Ox@Un@wBbDUh@c@tCEnFg@vQIpCYjDEvAOdSYnEUvAGbBPtGHrFT`DNv@Rb@ZIfCgBX{@NeA`@i@J@PDHRPjAHfBd@xB^jAh@z@`BWnFEnASn@[fAIlGfApBj@|BTpCf@p@}@j@mAR}@P}AJqCSeDCoFPcIX_DbBsIlAmCjCsDbAeChByFt@gAx@i@x@@b@Tx@rAT?\\oA^qClBuKbBcIpCyHr@_BjCwE`@qAf@_AP_AFwAM}Co@gHu@ePy@_NgAeX[}CaAeOk@mGkAuV}AwT]kLAoDQyDLcBMuC_@{Gu@qFGaBe@_FEcA]sB]qE_@gBgBkEc@kAAW[eLEyGHkGl@kJ?sBaBoZVoJRmDe@u@yCgBmBwAWg@k@cDYa@{DiBiD_F{@y@aAk@oDuAcBa@gAH_Bj@s@@gTwAmCwAgAw@u@y@y@{Ai@mBcAoNWkBa@aA{@]O[Ae@L}AYsB[i@USu@iCaAsHYmEo@qGAcAgAoFQyAu@kDcA{Da@aCs@_CQcAw@eByAmGe@eC_@}@WgEuAsFqAwCYoAEqCH}@k@wDMkE_@}Cw@iA{AkAMUc@cD]e@?KR[I[i@i@g@iBuA_Dk@iBY]eBzA_BP_B`BcAhBkAfAsCbDMAgA|@{@dAy@^OhAUj@";

	React.useEffect(() => {
		API.getAttendeesByRideId(ride.ride_id).then((attendees) => {
			setAttendees(attendees);
		});
	}, [ride.ride_id, attendees]);

	const formattedMapData = formatPolylineData(ride.route_data);

	const {
		formattedCoords,
		startLatLng,
		startLatitude,
		startLongitude,
		endLatLng,
		endLatitude,
		endLongitude,
	} = formattedMapData;

	const handleSubmit = () => {
		API.postUserToRideAttendees(attendee, ride.ride_id, user).then(
			(addedAttendee) => {
				setAttendees([addedAttendee, ...attendees]);
				setDisabled(true);
			}
		);
	};

	const handleLeaveEvent = () => {
		API.deleteAttendeeByRideId(user.username, ride.ride_id).then(() => {
			console.log("deleted", user.username);
			setDisabled(false);
		});
	};

	const navigation = useNavigation();
	return (
		<View>
			<Card style={styles.container}>
				<Card.Title
					style={styles.title}
					title={ride.title}
					subtitle={parseDate(ride.ride_date)}
				/>
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
				<Card.Content>
					<Paragraph style={styles.rideType}>
						Distance: {ride.distanceInKm}km
					</Paragraph>

					<Paragraph style={styles.rideType}>
						Ride Type: {ride.ride_type}
					</Paragraph>
					<Paragraph style={styles.rideType}>
						Experience Level: {ride.experience_level}
					</Paragraph>
					<Paragraph>{ride.description}</Paragraph>
				</Card.Content>
				<View style={styles.button}>
					<Button
						title="Join"
						color="#FF4500"
						onPress={() => handleSubmit()}
						disabled={disabled}
					/>
					<Button
						title="Leave"
						color={"#FF4500"}
						onPress={() => handleLeaveEvent()}
					/>
				</View>
				<TouchableOpacity
					onPress={() =>
						navigation.navigate("EventAttendees", { ride, attendees })
					}
				>
					<Paragraph style={styles.viewAttendees}>
						ATTENDEES: {attendees.length}
					</Paragraph>
				</TouchableOpacity>
			</Card>
			<ScrollView style={styles.commentContainer}>
				<Text style={{ fontWeight: "bold" }}>Comment</Text>
				<CommentList user={user} ride={ride} />
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20,
		marginTop: "15%",
		height: 500,
		borderRadius: 5,
		backgroundColor: "#f5f5f5",
	},
	title: {
		backgroundColor: "#e86b3a",
		padding: "2%",
		fontSize: 22,
		fontWeight: "bold",
		color: "#292929",
		textAlign: "center",
		borderRadius: 5,
	},
	commentContainer: {
		marginHorizontal: 20,
		marginTop: "2%",
		height: 230,
		borderRadius: 5,
		backgroundColor: "#f5f5f5",
	},
	button: {
		color: "white",
		fontWeight: "bold",
		height: 35,
		//justifyContent: "center",
		//alignItems: "center",
		//marginVertical: "1%",
		//width: 100,
		marginHorizontal: 50,
		//backgroundColor: "#FF4500",
		// shadowColor: "black",
		// shadowOpacity: 0.2,
		// shadowOffset: {
		// 	height: 1,
		// 	width: -2,
		// },
		// elevation: 2,
		flexDirection: "row",
		justifyContent: "space-around",
	},
	rideType: {
		textDecorationLine: "underline",
		marginVertical: 5,
	},
	viewAttendees: {
		color: "white",
		// fontWeight: "bold",
		height: 35,
		// justifyContent: "center",
		// alignItems: "center",
		// alignContent: "center",
		width: 117,
		padding: 6,
		marginVertical: "2%",
		marginHorizontal: "33%",
		borderRadius: 2,
		backgroundColor: "#708090",
		shadowColor: "black",
		shadowOpacity: 0.2,
		shadowOffset: {
			height: 1,
			width: -2,
		},
		elevation: 2,
	},

	map: {
		width: "100%",
		height: "40%",
		marginVertical: 1,
	},
});
