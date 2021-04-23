import React, { Component } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import stravaApi from 'strava-v3';

// import { REACT_NATIVE_STRAVA_CLIENT_ID } from "react-native-dotenv"

stravaApi.config({
  "access_token": "5c8ed25f992a3db4a0a84e0da18f98f46ba1e90f",
  "client_id": "64734",
  "client_secret":"1c40a829591afa728f4d54ed7b2408e11b092d9c",
  "redirect_uri": "localhost:19006"
})

const strava = new stravaApi.client("5c8ed25f992a3db4a0a84e0da18f98f46ba1e90f")

export default class App extends Component {
  // stravaLogin() {
  //   console.log("inside stravaLogin")

  //   strava.athlete.get({id: 29656122},function(err, payload, limits) {
  //     if(!err) {
  //         console.log(payload);
  //     }
  //     else {
  //         console.log(err);
  //     }
  //   });
  // }
  
    async stravaLogin() {
      console.log("inside stravaLogin")
      
      try {
        const payload = await strava.athlete.get()
        // const payload = await strava.oauth.getRequestAccessURL()
        console.log(payload)
      } catch (err) {
        console.log(err)
      }
    }

  render() {

    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Button
          color="#FF4500"
          title={"Signup with Strava"}
          style={styles.input}
          onPress={this.stravaLogin}
          //either send strava id to configureProfile then send to db
          //OR send to db on strava then fetch user id and pass to configureProfile then update db
        />
      </View>
    );
  }
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
