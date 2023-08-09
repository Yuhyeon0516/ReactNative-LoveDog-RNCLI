import {View} from 'react-native';
import React from 'react';
import {Header} from '../components/Header/Header';
import {CustomButton} from '../components/CustomButton';
import {Typography} from '../components/Typography';
import {useRootNavigation} from '../navigation/RootNavigation';
import {useSignupNavigation} from '../navigation/SignupNavigation';

export default function InputNameScreen() {
  const navigation = useRootNavigation<'Signup'>();
  const signupNavigation = useSignupNavigation<'InputName'>();
  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Group>
          <Header.Icon
            iconName="arrow-back"
            onPress={() => signupNavigation.goBack()}
          />
          <Header.Title title="InputName" />
        </Header.Group>
      </Header>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <CustomButton onPress={() => navigation.replace('MainTab')}>
          <Typography fontSize={16}>회원가입 완료</Typography>
        </CustomButton>
      </View>
    </View>
  );
}
