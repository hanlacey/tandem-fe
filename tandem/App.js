import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import StravaSignup from './components/StravaSignup';
import RideCard from './components/RideCard'
import UserProfile from './components/UserProfile';
import OpenRidesList from './components/OpenRidesList'
import EventAttendees from './components/EventAttendees';
import SingleRide from './components/SingleRide';
import PostRide from './components/PostRide'

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
        <Stack.Screen name="RideCard" component={RideCard} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="OpenRidesList" component={OpenRidesList} />
        <Stack.Screen name="EventAttendees" component={EventAttendees} />
        <Stack.Screen name="SingleRide" component={SingleRide} />
        <Stack.Screen name="PostRide" component={PostRide} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}
