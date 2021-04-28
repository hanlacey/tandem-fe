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
	const [user, setUser] = React.useState({
		username: "hannah123",
		password: null,
		email: null,
		avatar_url:
			"https://d3nn82uaxijpm6.cloudfront.net/assets/avatar/athlete/large-800a7033cc92b2a5548399e26b1ef42414dd1a9cb13b99454222d38d58fd28ef.png",
		first_name: "Hannah",
		last_name: "Lacey",
		location: "Manchester, United Kingdom",
		routes_data: "",
		bike_type: null,
		rider_level: null,
	});

	const attendee = {
		author: user.username,
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
		API.postUserToRideAttendees(attendee, ride.ride_id).then(
			(addedAttendee) => {
				setAttendees([addedAttendee, ...attendees]);
			}
		);
	};

	const handleLeaveEvent = () => {
		API.postUserToRideAttendees(attendee, ride.ride_id).then(
			(addedAttendee) => {
				setAttendees([addedAttendee, ...attendees]);
			}
		);
	};

	const navigation = useNavigation();
	return (
		<ScrollView>
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
					<TouchableOpacity
						onPress={() => navigation.navigate("EventAttendees", { ride })}
					>
						<Text style={styles.rideType}>Attendees: {attendees.length}</Text>
					</TouchableOpacity>
					<Paragraph style={styles.rideType}>
						Ride Type: {ride.ride_type}
					</Paragraph>
					<Paragraph style={styles.rideType}>
						Experience Level: {ride.experience_level}
					</Paragraph>
					<Paragraph>{ride.description}</Paragraph>
				</Card.Content>
				<Card.Actions>
					<Button
						title="Join"
						style={styles.button}
						onPress={() => handleSubmit()}
					/>
					<Button
						title="Leave"
						style={styles.button}
						onPress={() => handleLeaveEvent()}
					/>
				</Card.Actions>
			</Card>
			<View style={styles.commentContainer}>
				<Text style={{ fontWeight: "bold" }}>Make a comment</Text>
				<CommentList user={user} ride={ride} />
			</View>
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
		width: "100%",
		height: "40%",
	},
});
