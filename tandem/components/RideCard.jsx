import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function RideCard({ route, navigation }) {
  const [rideTitle, setRideTitle] = useState("hannah12345's ride");
  const [rideDate, setRideDate] = useState("May 2nd");
  const [rideTime, setRideTime] = useState("12:00");

  const [rideDifficulty, setRideDifficulty] = useState("Casual");
  const [rideBikeType, setRideBikeType] = useState("Mountain");
  const [rideLength, setRideLength] = useState("10 miles");
  const [rideRoute, setRideRoute] = useState(
    Math.floor(Math.random() * 100000)
  );
  const [rideAttendeeCount, setRideAttendeeCount] = useState("5");

  return (
    <View style={styles.card}>
      <Text>{rideTitle}</Text>
      <Text>
        Taking place on {rideDate} at {rideTime}
      </Text>
      <Text>Route ID: {rideRoute}</Text>
      <TouchableOpacity
          color="#FF4500"
          title={"User Profile"}
          style={styles.input}
          onPress={() => navigation.navigate("UserProfile")}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "30%",
    height: "30",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: "1%",
  },
});
