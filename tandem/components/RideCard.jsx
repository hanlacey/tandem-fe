import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";

export default function RideCard({ route, navigation }) {
  const [rideCreator, setRideCreator] = useState("hannah1234");
  const [rideTitle, setRideTitle] = useState(`${rideCreator}'s ride`);
  const [rideDate, setRideDate] = useState("May 2nd");
  const [rideTime, setRideTime] = useState("12:00");
  const [rideDifficulty, setRideDifficulty] = useState("casual");
  const [rideBikeType, setRideBikeType] = useState("mountain");
  const [rideLength, setRideLength] = useState("10 miles");
  const [rideRoute, setRideRoute] = useState(
    Math.floor(Math.random() * 100000)
  );
  const [rideAttendeeCount, setRideAttendeeCount] = useState("5");

  return (
    <View style={styles.card}>
      <Text>{rideTitle}</Text> {/*link to ride page*/}
      <Text>
        {rideDate} at {rideTime}
        {"\n"}
        Route: {rideRoute} - {rideLength}
        {"\n"}
        {rideDifficulty} ride for {rideBikeType} bike users
        {"\n"}
        Made by{" "}
        <TouchableHighlight style={styles.link}>
          <Text>{rideCreator}</Text>
        </TouchableHighlight>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    textAlign: "center",
  },
  link: {
    color: "#f4511e",
  },
});
