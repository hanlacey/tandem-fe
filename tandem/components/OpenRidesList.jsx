import React, { useState } from "react";
import { View, Text } from "react-native";
import { RideCard } from "../components/RideCard";
import sampleRides from "../utils/rideListGenerator";

export default function OpenRidesList({ route, navigation }) {
  const { user, userBikeType, userDifficulty } = route.params;
  const [rides, setRides] = useState([sampleRides]);
  const [rideBikeType, setRideBikeType] = useState(userBikeType);
  const [rideDifficulty, setRideDifficulty] = useState(userDifficulty);
  return <View></View>;
}
