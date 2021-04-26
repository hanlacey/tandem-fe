import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Button, StyleSheet, View } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://www.strava.com/oauth/mobile/authorize',
  tokenEndpoint: 'https://www.strava.com/oauth/token',
  revocationEndpoint: 'https://www.strava.com/oauth/deauthorize',
};

export default function App() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: '64734',
      scopes: ['activity:read_all'],
      redirectUri: makeRedirectUri({
        // For usage in bare and standalone
        // the "redirect" must match your "Authorization Callback Domain" in the Strava dev console.
        native: 'localhost:19006/oauthredirect',
      }),
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      console.log(response)
      const { code } = response.params;
      getActivityData(code)
    }
  }, [response]);

  const getActivityData = (code) => {
    fetch(`https://www.strava.com/oauth/token?client_id=64734&client_secret=1c40a829591afa728f4d54ed7b2408e11b092d9c&code=${code}&grant_type=authorization_code`, { method: "POST" })
      .then(response => {
        console.log(response)
        // const accessToken = response.access_token

        // fetch(`https://www.strava.com/api/v3/athlete/activities?access_token=${accessToken}`)
        //   .then(response => {
        //     console.log(response)
        //   })
      })
  }

  return (
    <View style={styles.container}>
    <Button
      color="#FF4500"
      title={"Signup with Strava"}
      style={styles.input}
      disabled={!request}
      onPress={() => {
        promptAsync();
      }}
    />
     <Button
          title={"View routes"}
          style={styles.button}
          onPress={() => navigation.navigate("MapComponent")}
          color="#841584"
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
});