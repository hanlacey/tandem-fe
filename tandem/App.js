import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import ConfigureProfile from './components/ConfigureProfile'
import StravaSignup from './components/StravaSignup';
<<<<<<< HEAD
import RideCard from './components/RideCard'
=======
import UserProfile from './components/UserProfile';
>>>>>>> 61e00f16e3f83af040846febf40fc2ef5b7ea108

const Stack = createStackNavigator()
// object containing two properties Screen and Navigator

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={StravaSignup} options={{
          title: 'Tandem',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        <Stack.Screen name="StravaSignup" component={StravaSignup} />
        <Stack.Screen name="ConfigureProfile" component={ConfigureProfile} />
<<<<<<< HEAD
        <Stack.Screen name="RideCard" component={RideCard} />

=======
        <Stack.Screen name="UserProfile" component={UserProfile} />
>>>>>>> 61e00f16e3f83af040846febf40fc2ef5b7ea108
      </Stack.Navigator>
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
