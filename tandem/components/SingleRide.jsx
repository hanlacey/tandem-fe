import * as React from "react";
import { StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Card, Paragraph, TextInput } from "react-native-paper";
import CommentList from "./CommentList"
import * as API from "../api/api"
import parseDate from "../utils/parseDate";
import { formatPolylineData } from "../utils/formatPolylineData"

const ride = {
	ride_id: 1,
	author: "raofRides",
	ride_date: 1612329163389,
	route_data: "Manchester",
	ride_type: "road",
	title: "Manchester loop",
	routeData: "}xxdI~eaHQb@FTNP~@ZX\\M`@{@|ADHXd@bBTTNXp@A\\HVQb@J|@h@r@JZZBRRN\\|@lAh@jAAtBT~Dx@x@`CJb@bAr@dAdAx@fAnAV`@j@`Bp@rCn@zA\\vA`@~@|@z@hApAdApAzA~Bf@zAD?v@fBzB|G`@f@x@`@d@dA@n@TrBj@dDVhGIrCL|@h@xADZC\\L|BGdC]pDk@~EoAtEq@|@gD~DmBrCCJBXUl@]^e@lAAXYZEz@NlAE`AL~DRtCLz@pArF`DhJn@xBv@zDnBbHrB|IrHzSl@z@tD|D~CbMd@fDLhCTvBFjCH|@p@tCbAjCn@pC`@lA|@bFNtCH`DWlD^hDfAhE`@fCBfAGtCFz@Tp@pAjBPv@jBxO@h@KfCAzDOrCB\\E`CGzB^xET`AK|ACvAm@dBGh@GnA@`DPzBhAxEBhAIf@g@vAO^QNe@pAa@nDYrAWj@{@z@o@^Q\\uAnDU|AFtFr@zGNb@`@^r@dAb@jAAb@Ox@Un@wBbDUh@c@tCEnFg@vQIpCYjDEvAOdSYnEUvAGbBPtGHrFT`DNv@Rb@ZIfCgBX{@NeA`@i@J@PDHRPjAHfBd@xB^jAh@z@`BWnFEnASn@[fAIlGfApBj@|BTpCf@p@}@j@mAR}@P}AJqCSeDCoFPcIX_DbBsIlAmCjCsDbAeChByFt@gAx@i@x@@b@Tx@rAT?\\oA^qClBuKbBcIpCyHr@_BjCwE`@qAf@_AP_AFwAM}Co@gHu@ePy@_NgAeX[}CaAeOk@mGkAuV}AwT]kLAoDQyDLcBMuC_@{Gu@qFGaBe@_FEcA]sB]qE_@gBgBkEc@kAAW[eLEyGHkGl@kJ?sBaBoZVoJRmDe@u@yCgBmBwAWg@k@cDYa@{DiBiD_F{@y@aAk@oDuAcBa@gAH_Bj@s@@gTwAmCwAgAw@u@y@y@{Ai@mBcAoNWkBa@aA{@]O[Ae@L}AYsB[i@USu@iCaAsHYmEo@qGAcAgAoFQyAu@kDcA{Da@aCs@_CQcAw@eByAmGe@eC_@}@WgEuAsFqAwCYoAEqCH}@k@wDMkE_@}Cw@iA{AkAMUc@cD]e@?KR[I[i@i@g@iBuA_Dk@iBY]eBzA_BP_B`BcAhBkAfAsCbDMAgA|@{@dAy@^OhAUj@",
	description: "anyone want to join me on a loop around manchester",
	experience_level: "intermediate",
	created_at: 1601324163389,
	votes: 0,
};
//Make call to api for attendees within this component or pass down from ride card

export default function SingleRide({ route }) {
	const [text, setText] = React.useState("");
	const [attendees, setAttendees] = React.useState([]);
	const { ride } = route.params;


 React.useEffect(()=>{
		API.getAttendeesByRideId(ride.ride_id).then((attendees) => {
		setAttendees(attendees)})
		}, [ride.ride_id])
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
					value={text}
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
