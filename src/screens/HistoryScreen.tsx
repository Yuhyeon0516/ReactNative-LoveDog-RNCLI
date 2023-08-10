import {FlatList, View, useWindowDimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Header} from '../components/Header/Header';
import {useRootNavigation} from '../navigation/RootNavigation';
import {useDispatch, useSelector} from 'react-redux';
import {TypeUserDispatch, getUserLikedHistory} from '../actions/user';
import {TypeRootReducer} from '../store/store';
import {TypeDog} from '../types/TypeDog';
import {CustomButton} from '../components/CustomButton';
import {RemoteImage} from '../components/RemoteImage';
import ImageView from 'react-native-image-viewing';

export default function HistoryScreen() {
  const [visible, setVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigation = useRootNavigation<'History'>();
  const {width} = useWindowDimensions();
  const dispatch = useDispatch<TypeUserDispatch>();
  const likeList = useSelector<TypeRootReducer, TypeDog[]>(
    state => state.user.history,
  ).sort((a, b) => b.regeditAt - a.regeditAt);

  useEffect(() => {
    dispatch(getUserLikedHistory());
  }, [dispatch]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="History" />
        <Header.Icon iconName="close" onPress={() => navigation.goBack()} />
      </Header>
      <FlatList
        numColumns={2}
        data={likeList}
        renderItem={({item, index}) => {
          return (
            <CustomButton
              onPress={() => {
                setSelectedIndex(index);
                setVisible(true);
              }}>
              <RemoteImage
                width={width * 0.5}
                height={width * 0.5}
                url={item.photoUrl}
              />
            </CustomButton>
          );
        }}
      />
      <ImageView
        images={likeList.map(item => ({uri: item.photoUrl}))}
        imageIndex={selectedIndex}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      />
    </View>
  );
}
