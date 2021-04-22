import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import sampleRides from "../utils/rideListGenerator";
import RideCard from "./RideCard";

export default function OpenRidesList({ route, navigation }) {
  const { user, userBikeType, userDifficulty } = route.params;
  const [rides, setRides] = useState([sampleRides]);
  const [rideBikeType, setRideBikeType] = useState(userBikeType);
  const [rideDifficulty, setRideDifficulty] = useState(userDifficulty);

  const list = () => {
    return sampleRides.map((ride) => {
      return (
        <View key={ride.rideId}>
          <RideCard ride={ride} />
        </View>
      );
    });
  };
  return <View style={styles.container}>{list()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: "1",
    marginTop: "Constants.statusBarHeight",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: "20",
    marginVertical: "8",
    marginHorizontal: "16",
  },
});
