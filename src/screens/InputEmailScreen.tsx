import {View} from 'react-native';
import React from 'react';
import {Header} from '../components/Header/Header';
import {CustomButton} from '../components/CustomButton';
import {Typography} from '../components/Typography';
import {
  useSignupNavigation,
  useSignupRoute,
} from '../navigation/SignupNavigation';

export default function InputEmailScreen() {
  const navigation = useSignupNavigation<'InputEmail'>();
  const route = useSignupRoute<'InputEmail'>();

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Group>
          <Header.Title title="InputEmail" />
        </Header.Group>
        <Header.Icon iconName="close" onPress={() => navigation.goBack()} />
      </Header>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <CustomButton
          onPress={() =>
            navigation.push('InputName', {
              uid: '',
              preInput: route.params.preInput,
              inputEmail: '',
            })
          }>
          <Typography fontSize={16}>회원가입</Typography>
        </CustomButton>
      </View>
    </View>
  );
}
