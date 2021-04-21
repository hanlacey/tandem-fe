import React, { PureComponent } from "react";
import { Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default class ConfigureProfile extends PureComponent {
  // state = {
  //   user_id: "",
  //   location: "",
  //   bikeType: "",
  //   experienceLevel: "",
  // };
  
  render() {
    const [selectedBikeType, setSelectedBikeType] = useState();
    return (
      <View>
        <Picker
          selectedValue={selectedBikeType}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedBikeType(itemValue)
          }
        >
          <Picker.Item label="Road" value="Road" />
          <Picker.Item label="Mountain" value="Mountain" />
        </Picker>
      </View>
    );
  }
}
