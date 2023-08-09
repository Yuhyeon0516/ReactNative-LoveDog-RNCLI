import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IntroScreen from '../screens/IntroScreen';
import SignupNavigation from './SignupNavigation';
import TabNavigation from './TabNavigation';
import HistoryScreen from '../screens/HistoryScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Intro" component={IntroScreen} />
      <Stack.Screen name="Signup" component={SignupNavigation} />
      <Stack.Screen name="Main" component={TabNavigation} />
      <Stack.Screen name="History" component={HistoryScreen} />
    </Stack.Navigator>
  );
}
