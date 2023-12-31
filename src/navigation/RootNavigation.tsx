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
import TakePhotoScreen from '../screens/TakePhotoScreen';
import {useSelector} from 'react-redux';
import {TypeRootReducer} from '../store/store';

export type TypeRootNavigation = {
  Intro: undefined;
  Signup: NavigatorScreenParams<TypeSignupNavigation>;
  MainTab: undefined;
  History: undefined;
  TakePhoto: {onTakePhoto: (uri: string) => void};
};

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  const isSignIn = useSelector<TypeRootReducer, boolean>(
    state => state.user.user !== null,
  );

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Intro" component={IntroScreen} />
      {!isSignIn && <Stack.Screen name="Signup" component={SignupNavigation} />}
      {isSignIn && (
        <>
          <Stack.Screen name="MainTab" component={TabNavigation} />
          <Stack.Screen name="History" component={HistoryScreen} />
        </>
      )}
      <Stack.Screen name="TakePhoto" component={TakePhotoScreen} />
    </Stack.Navigator>
  );
}

export const useRootNavigation = <
  RouteName extends keyof TypeRootNavigation,
>() =>
  useNavigation<NativeStackNavigationProp<TypeRootNavigation, RouteName>>();

export const useRootRoute = <RouteName extends keyof TypeRootNavigation>() =>
  useRoute<RouteProp<TypeRootNavigation, RouteName>>();
