import React from 'react';
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import MainScreen from '../screens/MainScreen';
import MyScreen from '../screens/MyScreen';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

export type TypeTabNavigation = {
  Main: undefined;
  My: undefined;
};

const Tab = createBottomTabNavigator<TypeTabNavigation>();

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Main" component={MainScreen} />
      <Tab.Screen name="My" component={MyScreen} />
    </Tab.Navigator>
  );
}

export const useTabNavigation = <RouteName extends keyof TypeTabNavigation>() =>
  useNavigation<BottomTabNavigationProp<TypeTabNavigation, RouteName>>();

export const useTabRoute = <RouteName extends keyof TypeTabNavigation>() =>
  useRoute<RouteProp<TypeTabNavigation, RouteName>>();
