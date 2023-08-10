import {View} from 'react-native';
import React from 'react';
import {Header} from '../components/Header/Header';
import {useRootNavigation} from '../navigation/RootNavigation';
import {CustomButton} from '../components/CustomButton';
import {Typography} from '../components/Typography';
import {Icon} from '../components/Icons';
import {useSelector} from 'react-redux';
import {TypeRootReducer} from '../store/store';
import {TypeUser} from '../types/TypeUser';
import {RemoteImage} from '../components/RemoteImage';
import {Spacer} from '../components/Spacer';

export default function MyScreen() {
  const navigation = useRootNavigation<'MainTab'>();
  const userInfo = useSelector<TypeRootReducer, TypeUser | null>(
    state => state.user.user,
  );

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="My" />
      </Header>
      {userInfo && (
        <View
          style={{
            paddingVertical: 24,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <RemoteImage
            url={userInfo.profileImage}
            width={100}
            height={100}
            style={{borderRadius: 50}}
          />
          <Spacer space={20} />
          <Typography fontSize={20}>{userInfo.userName}</Typography>
        </View>
      )}
      <View style={{flex: 1}}>
        <CustomButton onPress={() => navigation.push('History')}>
          <View
            style={{
              backgroundColor: 'white',
              paddingVertical: 12,
              paddingHorizontal: 8,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Typography fontSize={16}>History로 이동</Typography>
            <Icon iconName="chevron-forward" size={16} color="gray" />
          </View>
        </CustomButton>
      </View>
    </View>
  );
}
