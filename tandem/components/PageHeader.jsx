import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function PageHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Tandem</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3F3F3F",
  },
  headerText: {
    fontSize: "20pt",
    padding: "5%",
    color: "FF7A00",
  },
});
