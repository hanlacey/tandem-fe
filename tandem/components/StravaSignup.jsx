import React, { useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import {Paragraph} from "react-native-paper";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import axios from "axios";

import { REACT_APP_STRAVA_CLIENT_ID,REACT_APP_STRAVA_CLIENT_SECRET } from "@env";

import { formatUsersData } from "../utils/formatUsersData";
console.log(
	REACT_APP_STRAVA_CLIENT_ID,
	"client",
	REACT_APP_STRAVA_CLIENT_SECRET
);
WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
	authorizationEndpoint: "https://www.strava.com/oauth/mobile/authorize",
	tokenEndpoint: "https://www.strava.com/oauth/token",
	revocationEndpoint: "https://www.strava.com/oauth/deauthorize",
};

export default function App({ navigation }) {
	const [request, response, promptAsync] = useAuthRequest(
		{
			clientId: REACT_APP_STRAVA_CLIENT_ID,
			scopes: ["activity:read_all"],
			redirectUri: makeRedirectUri({
				native: "192.168.1.2",
				// native: 'https://northcoders-tandem.netlify.app',
			}),
		},
		discovery
	);

	React.useEffect(() => {
		if (response?.type === "success") {
			const { code } = response.params;
			getActivityData(code);
		}
	}, [response]);

	const getActivityData = async (code) => {
		const config = {
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET,PUT,POST",
			},
		};

		const userData = await axios.post(
			`https://www.strava.com/oauth/token?client_id=${REACT_APP_STRAVA_CLIENT_ID}&client_secret=${REACT_APP_STRAVA_CLIENT_SECRET}&code=${code}&grant_type=authorization_code`,
			{},
			config
		);

		const { access_token } = userData.data;

		const activityData = await axios.get(
			`https://www.strava.com/api/v3/athlete/activities?access_token=${access_token}`
		);

		const newUserData = await formatUsersData(userData, activityData);

		navigation.navigate("OpenRidesList", {userData: newUserData});
	};


	return (
		<View style={styles.container}>
		<View style={styles.button}>
		<Paragraph
		disabled={!request}
		title={"Sign up"}
		onPress={() => {
		promptAsync()
		}}
		>Sign Up</Paragraph>
		</View>
		<View style={styles.button}>
		<Paragraph
		title={"View open rides"}
		onPress={() => navigation.navigate("OpenRidesList")}
		>VIEW OPEN RIDES</Paragraph>
		</View>
		{/* <Button
		color="#FF4500"
		margin="50%"
		title={"View open rides"}
		onPress={() => navigation.navigate("OpenRidesList")}
		/> */}
		</View>
		);
		}
		
		const styles = StyleSheet.create( {
		container: {
		marginHorizontal: 20,
		marginTop: "90%",
		borderRadius: 15,
		},
		button: {
		//color: "white",
		//fontWeight: "bold",
		height: 55,
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: 35,
		width: 300,
		padding: "5%",
		margin: "5%",
		borderRadius: 25,
		backgroundColor: "#FF4500",
		shadowColor: "black",
		shadowOpacity: 0.2,
		shadowOffset: {
		height: 1,
		width: -2,
		},
		elevation: 5,
		}
		})
		
// 	return (
// 		<View>
// 			<Button
// 				disabled={!request}
// 				title="Signup or login with Strava"
// 				onPress={() => {promptAsync()}}
// 			/>
// 			<Button
// 				color="#FF4500"
// 				title={"View open rides"}
// 				onPress={() => navigation.navigate("OpenRidesList")}
// 			/>
// 		</View>
// 	);
// }
