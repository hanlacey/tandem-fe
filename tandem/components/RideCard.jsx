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
        <TouchableOpacity
          onPress={() => navigation.navigate("UserProfile", { rideCreator })}
        >
          <Text style={styles.link}>ride created by {rideCreator}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("RidePage", { rideId })}
        ></TouchableOpacity>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    marginHorizontal: "5%",
    marginVertical: "5%",
    paddingBottom: "5%",
    textAlign: "center",
  },
  title: {
    backgroundColor: "#f4511e",
    padding: "5%",
  },
  body: {
    paddingVertical: "5%",
    paddingHorizontal: "5%",
  },
  link: {
    color: "red",
  },
});

export default RideCard;
