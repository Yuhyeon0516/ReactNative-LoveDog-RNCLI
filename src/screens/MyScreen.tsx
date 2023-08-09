import {View} from 'react-native';
import React from 'react';
import {Header} from '../components/Header/Header';
import {useRootNavigation} from '../navigation/RootNavigation';
import {CustomButton} from '../components/CustomButton';
import {Typography} from '../components/Typography';

export default function MyScreen() {
  const navigation = useRootNavigation<'MainTab'>();

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="My" />
      </Header>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <CustomButton onPress={() => navigation.push('History')}>
          <Typography fontSize={16}>History로 이동</Typography>
        </CustomButton>
      </View>
    </View>
  );
}
