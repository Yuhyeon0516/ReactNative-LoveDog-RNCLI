import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigation from './src/navigation/RootNavigation';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

GoogleSignin.configure({
  webClientId:
    '611587210424-ap6v36pah4l0c8jhli0v34i9mg9vosg0.apps.googleusercontent.com',
});

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <GestureHandlerRootView style={{flex: 1}}>
          <NavigationContainer>
            <RootNavigation />
          </NavigationContainer>
        </GestureHandlerRootView>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
