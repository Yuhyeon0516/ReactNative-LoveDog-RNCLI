import {View} from 'react-native';
import React from 'react';
import {Header} from '../components/Header/Header';
import {useRootNavigation} from '../navigation/RootNavigation';

export default function HistoryScreen() {
  const navigation = useRootNavigation<'History'>();
  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="History" />
        <Header.Icon iconName="close" onPress={() => navigation.goBack()} />
      </Header>
    </View>
  );
}
