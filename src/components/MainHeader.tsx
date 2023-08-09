import {Image, View} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Spacer} from './Spacer';

export default function MainHeader() {
  return (
    <View
      style={{
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View>
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/512px-YouTube_Logo_2017.svg.png',
          }}
          width={100}
          height={30}
          resizeMode="contain"
          style={{margin: 10, flex: 1}}
        />
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <MaterialIcons name="cast" size={30} color={'black'} />
        <Spacer space={13} horizontal />
        <MaterialCommunityIcons name="bell-outline" size={30} color={'black'} />
        <Spacer space={8} horizontal />
        <MaterialIcons name="search" size={30} color={'black'} />
      </View>
    </View>
  );
}
