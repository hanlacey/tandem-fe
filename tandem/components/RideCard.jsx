import React from "react";
import { View, StyleSheet, Text, Button, TouchableOpacity } from "react-native";
// import { withNavigation } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

function RideCard({ ride, route }) {
  const {
    rideId,
    rideCreator,
    rideDate,
    rideTime,
    rideDifficulty,
    rideBikeType,
    rideLength,
    rideRoute,
    attendeeCount,
  } = ride;

  const navigation = useNavigation();
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{rideCreator}'s ride</Text>
      <Text style={styles.body}>
        {rideDate} at {rideTime}
        {"\n"}
        {rideDifficulty} {" / "} {rideBikeType}
        {"\n"}
        {rideLength}
        {"\n"}
        {attendeeCount} attending
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("UserProfile", { rideCreator })}
      >
        <Text style={styles.link}>ride created by {rideCreator}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("RidePage", { rideId })}
      >
        <Text style={styles.link}>join ride</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    marginHorizontal: "2rem",
    marginVertical: "1rem",
    paddingBottom: "1rem",
    textAlign: "center",
  },
  title: {
    backgroundColor: "#f4511e",
    paddingVertical: "0.5rem",
  },
  body: {
    paddingVertical: "1rem",
  },
  link: {
    color: "red",
  },
});

export default RideCard;
