import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function ConfigureProfile() {
  const [user, setUser] = useState("Anon");
  const [bikeType, setBikeType] = useState("not set");
  const [preferredRide, setPreferredRide] = useState("not set");

  return (
    <View style={styles.container}>
      {/* displays updated state */}
      <Text>The user is {user}</Text>
      <Text>
        {user}'s bike type is {bikeType}
      </Text>
      <Text>
        {user}'s preferred ride type is {preferredRide}
      </Text>
      {/* bike picker */}
      <br></br> <Text>Choose your bike type:</Text>
      <Picker
        selectedValue={bikeType}
        onValueChange={(itemValue, itemIndex) => setBikeType(itemValue)}
      >
        <Picker.Item label="Road" value="road" />
        <Picker.Item label="Mountain" value="mountain" />
      </Picker>
      {/* experience picker */}
      <br></br> <Text>Which level of difficulty would you prefer? </Text>
      <Picker
        selectedValue={preferredRide}
        onValueChange={(itemValue, itemIndex) => setPreferredRide(itemValue)}
      >
        <Picker.Item label="Casual" value="casual" />
        <Picker.Item label="Challenging" value="challenging" />
        <Picker.Item label="Hardcore" value="hardcore" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
});
