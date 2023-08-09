import {View} from 'react-native';
import React from 'react';
import {Header} from '../components/Header/Header';

export default function MyScreen() {
  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="My" />
      </Header>
    </View>
  );
}
