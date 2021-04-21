import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ConfigureProfile() {
  const [user, setUser] = useState("not logged in");
  return (
    <View style={styles.container}>
      <Text>The user is {user}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3F3F3F",
  },
});