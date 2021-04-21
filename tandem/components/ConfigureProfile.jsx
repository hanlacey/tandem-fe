import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

export default function ConfigureProfile() {
  const [user, setUser] = useState("Anon");
  const [bikeType, setBikeType] = useState("road");
  const [difficulty, setDifficulty] = useState("casual");
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* displays updated state */}
      <Text>The user is {user}</Text>
      <Text>
        {user}'s bike type is {bikeType}
      </Text>
      <Text>
        {user}'s preferred ride difficulty is {difficulty}
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
        selectedValue={difficulty}
        onValueChange={(itemValue, itemIndex) => setDifficulty(itemValue)}
      >
        <Picker.Item label="Casual" value="casual" />
        <Picker.Item label="Challenging" value="challenging" />
        <Picker.Item label="Hardcore" value="hardcore" />
      </Picker>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("RideCard", {
            user: user,
            userBikeType: bikeType,
            userDifficulty: difficulty,
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
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  button: {
    width: "10%",
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4511e",
    margin: "1%",
    color: "white",
  },
});
