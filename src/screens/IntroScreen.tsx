import {View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Header} from '../components/Header/Header';
import {useRootNavigation} from '../navigation/RootNavigation';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export default function IntroScreen() {
  const navigation = useRootNavigation<'Intro'>();
  const safeAreaInset = useSafeAreaInsets();
  const [visibleGoogleSignInButton, setVisibleGoogleSignInButton] =
    useState<boolean>(true);

  async function handleCheckUserLoginOnce() {
    const isSignIn = await GoogleSignin.isSignedIn();

    if (!isSignIn) {
      setVisibleGoogleSignInButton(true);
      return;
    }

    setVisibleGoogleSignInButton(false);

    const result = await GoogleSignin.signInSilently();
    const googleCredential = auth.GoogleAuthProvider.credential(result.idToken);
    const authResult = await auth().signInWithCredential(googleCredential);
    const uid = authResult.user.uid;

    const now = new Date();
    const dbRef = database().ref(`member/${uid}`);

    await dbRef.update({
      lastLoginAt: now.toISOString(),
    });

    navigation.reset({
      routes: [{name: 'MainTab'}],
    });
  }

  const checkUserLoginOnce = useCallback(handleCheckUserLoginOnce, [
    navigation,
  ]);

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

  useEffect(() => {
    checkUserLoginOnce();
  }, [checkUserLoginOnce]);

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
        {visibleGoogleSignInButton && (
          <GoogleSigninButton onPress={onPressGoogleSignin} />
        )}
      </View>
    </View>
  );
}
