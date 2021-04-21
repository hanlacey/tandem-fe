// import React, { PureComponent, useState } from "react";
// import { Text, TextInput, View } from "react-native";
// import { Picker } from "@react-native-picker/picker";

// export default class ConfigureProfile extends PureComponent {
//   render() {
//     return (

//     );
//   }
// }

import React, { useState } from "react";
import { View, Text } from "react-native";

export default function ConfigureProfile() {
  const [user, setUser] = useState("Alan");
  return (
    <View style={styles.container}>
      <Text>The username is {user}</Text>
    </View>
  );
}
