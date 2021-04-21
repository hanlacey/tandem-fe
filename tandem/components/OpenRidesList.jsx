import React, { useState } from "react";
import { View, Text } from "react-native";

export default function RideCard({ route, navigation }) {
  const { user, userBikeType, userDifficulty } = route.params;
  const [rideBikeType, setRideBikeType] = useState(userBikeType);
  const [rideDifficulty, setRideDifficulty] = useState(userDifficulty);

  return (
    <View>
      <Text></Text>
    </View>
  );
}
