import React, { useState } from "react";
import { View, Button } from "react-native";

import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import axios from "axios";

import {
	REACT_APP_STRAVA_CLIENT_ID,
	REACT_APP_STRAVA_CLIENT_SECRET,
} from "@env";

import { formatUsersData } from "../utils/formatUsersData";

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
				native: "localhost",
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

		formatUsersData(userData, activityData);

		navigation.navigate("OpenRidesList");
	};

	return (
		<View>
        <Button
          disabled={!request}
          title="Login"
          onPress={() => {
            promptAsync();
          }}
        />


        <Button
          color="#FF4500"
          title={"Configure profile"}
          onPress={() => navigation.navigate("ConfigureProfile")}
        />
      </View>
	);
}
