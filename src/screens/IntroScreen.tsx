import {View} from 'react-native';
import React, {useCallback} from 'react';
import {Header} from '../components/Header/Header';
import {useRootNavigation} from '../navigation/RootNavigation';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';

export default function IntroScreen() {
  const navigation = useRootNavigation<'Intro'>();
  const safeAreaInset = useSafeAreaInsets();

  async function handleGoogleSignInPress() {
    const isSignIn = await GoogleSignin.isSignedIn();

    if (isSignIn) {
      await GoogleSignin.signOut();
    }

    const result = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(result.idToken);
    const authResult = await auth().signInWithCredential(googleCredential);

    navigation.push('Signup', {
      screen: 'InputEmail',
      params: {
        preInput: {
          email: result.user.email,
          name: result.user.name ?? 'Unknown',
          profileImage: result.user.photo ?? '',
        },
        uid: authResult.user.uid,
      },
    });
  }

  const onPressGoogleSignin = useCallback(handleGoogleSignInPress, [
    navigation,
  ]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Intro" />
      </Header>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: 32 + safeAreaInset.bottom,
        }}>
        <GoogleSigninButton onPress={onPressGoogleSignin} />
      </View>
    </View>
  );
}
