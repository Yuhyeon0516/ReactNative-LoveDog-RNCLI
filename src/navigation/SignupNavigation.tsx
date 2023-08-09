import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import InputEmailScreen from '../screens/InputEmailScreen';
import InputNameScreen from '../screens/InputNameScreen';

const Stack = createNativeStackNavigator();

export default function SignupNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="InputEmail" component={InputEmailScreen} />
      <Stack.Screen name="InputName" component={InputNameScreen} />
    </Stack.Navigator>
  );
}
