import {View} from 'react-native';
import React from 'react';
import {Header} from '../components/Header/Header';
import {CustomButton} from '../components/CustomButton';
import {Typography} from '../components/Typography';
import {useRootNavigation} from '../navigation/RootNavigation';

export default function IntroScreen() {
  const navigation = useRootNavigation<'Intro'>();

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Intro" />
      </Header>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <CustomButton
          onPress={() =>
            navigation.push('Signup', {
              screen: 'InputEmail',
              params: {
                uid: '',
                preInput: {
                  email: 'test@test.com',
                  name: 'test',
                  profileImage: '',
                },
              },
            })
          }>
          <Typography fontSize={16}>회원가입</Typography>
        </CustomButton>

        <CustomButton onPress={() => navigation.replace('MainTab')}>
          <Typography fontSize={16}>메인</Typography>
        </CustomButton>
      </View>
    </View>
  );
}
