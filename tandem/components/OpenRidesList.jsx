import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import rideData from "../assets/rides";
import RideCard from "./RideCard";

export default function OpenRidesList({ route }) {
  const { user, userBikeType, userDifficulty } = route.params;
  const [rides, setRides] = useState(rideData);
  const [rideBikeType, setRideBikeType] = useState(userBikeType);
  const [rideDifficulty, setRideDifficulty] = useState(userDifficulty);

  const list = () => {
    return rides.map((ride) => {
      return (
        <View key={ride.ride_id}>
          <RideCard ride={ride} />
        </View>
      );
    });
  };
  return <ScrollView style={styles.container}>{list()}</ScrollView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "5%",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: "20",
    marginVertical: "8",
    marginHorizontal: "16",
  },
});
