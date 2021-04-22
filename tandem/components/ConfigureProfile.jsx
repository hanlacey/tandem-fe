import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function ConfigureProfile({ navigation }) {
  const [user, setUser] = useState("hannah1234");
  const [bikeType, setBikeType] = useState("road");
  const [difficulty, setDifficulty] = useState("casual");

  return (
    <View style={styles.container}>
      <Text>Logged in as {user}</Text>
      <Text>
        {user}'s bike type is {bikeType}
      </Text>
      <Text>
        {user}'s preferred ride difficulty is {difficulty}
      </Text>

      <Text>Choose your bike type:</Text>
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={bikeType}
        onValueChange={(itemValue, itemIndex) => setBikeType(itemValue)}
      >
        <Picker.Item label="Road" value="road" />
        <Picker.Item label="Mountain" value="mountain" />
      </Picker>
      <Picker
        selectedValue={difficulty}
        style={styles.picker}
        itemStyle={styles.pickerItem}
        onValueChange={(itemValue, itemIndex) => setDifficulty(itemValue)}
      >
        <Picker.Item label="Casual" value="casual" />
        <Picker.Item label="Challenging" value="challenging" />
        <Picker.Item label="Hardcore" value="hardcore" />
      </Picker>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("OpenRidesList", {
            user: user,
            userBikeType: bikeType,
            userDifficulty: difficulty,
            navigation,
          })
        }
        color="#841584"
      >
        <Text>Get started</Text>
      </TouchableOpacity>

   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#FFF",
    paddingTop: "15%",
  },
  button: {
    width: "35%",
    height: "8%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4511e",
    color: "white",
  },
  picker: {
    width: "70%",
    height: "20%",
    backgroundColor: "white",
    margin: 0,
  },
  pickerItem: {
    fontSize: 14,
  },
});
