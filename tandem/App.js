import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import ConfigureProfile from './components/ConfigureProfile'
import StravaSignup from './components/StravaSignup';
import RideCard from './components/RideCard'
import UserProfile from './components/UserProfile';
import OpenRidesList from './components/OpenRidesList'
import EventAttendees from './components/EventAttendees';
import SingleRide from './components/SingleRide';

const Stack = createStackNavigator()
// object containing two properties Screen and Navigator

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
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
        <Stack.Screen name="RideCard" component={RideCard} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="OpenRidesList" component={OpenRidesList} />
        <Stack.Screen name="Event Attendees" component={EventAttendees} />
        <Stack.Screen name="SingleRide" component={SingleRide} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "red"
  }
});
