import React from 'react';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import IntroScreen from '../screens/IntroScreen';
import SignupNavigation, {TypeSignupNavigation} from './SignupNavigation';
import TabNavigation from './TabNavigation';
import HistoryScreen from '../screens/HistoryScreen';
import {
  NavigatorScreenParams,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

export type TypeRootNavigation = {
  Intro: undefined;
  Signup: NavigatorScreenParams<TypeSignupNavigation>;
  Main: undefined;
  History: undefined;
};

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

export const useSignupNavigation = <
  RouteName extends keyof TypeRootNavigation,
>() =>
  useNavigation<NativeStackNavigationProp<TypeRootNavigation, RouteName>>();

export const useSignupRoute = <RouteName extends keyof TypeRootNavigation>() =>
  useRoute<RouteProp<TypeRootNavigation, RouteName>>();
