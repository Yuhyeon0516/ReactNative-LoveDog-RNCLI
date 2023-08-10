import {View, useWindowDimensions} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {Header} from '../components/Header/Header';
import {useDispatch, useSelector} from 'react-redux';
import {TypeRootReducer} from '../store/store';
import {TypeDog} from '../types/TypeDog';
import {TypeDogDispatch, getDog, likeDog} from '../actions/dog';
import {RemoteImage} from '../components/RemoteImage';
import {Spacer} from '../components/Spacer';
import {CustomButton} from '../components/CustomButton';
import {Icon} from '../components/Icons';
import {Typography} from '../components/Typography';

export default function MainScreen() {
  const {width} = useWindowDimensions();
  const dog = useSelector<TypeRootReducer, TypeDog | null>(
    state => state.dog.currentDog,
  );

  const dispatch = useDispatch<TypeDogDispatch>();

  function handlePressLike() {
    if (!dog) {
      return;
    }
    dispatch(likeDog(dog));
  }
  const onPressLike = useCallback(handlePressLike, [dispatch, dog]);

  function handlePressNotLike() {
    dispatch(getDog());
  }
  const onPressNotLike = useCallback(handlePressNotLike, [dispatch]);

  useEffect(() => {
    dispatch(getDog());
  }, [dispatch]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Main" />
      </Header>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {dog && (
          <View style={{width: width * 0.85}}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <RemoteImage
                url={dog.photoUrl}
                width={width * 0.7}
                height={width * 0.7}
              />
            </View>
            <Spacer space={64} />
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1, marginRight: 4}}>
                <CustomButton onPress={onPressLike}>
                  <View
                    style={{
                      paddingVertical: 12,
                      backgroundColor: 'red',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 4,
                    }}>
                    <Icon iconName="thumbs-up" color="white" size={16} />
                    <Typography fontSize={20} color="white">
                      Like
                    </Typography>
                  </View>
                </CustomButton>
              </View>
              <View style={{flex: 1, marginLeft: 4}}>
                <CustomButton onPress={onPressNotLike}>
                  <View
                    style={{
                      paddingVertical: 12,
                      backgroundColor: 'blue',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 4,
                    }}>
                    <Icon iconName="thumbs-down" color="white" size={16} />
                    <Typography fontSize={20} color="white">
                      Not Like
                    </Typography>
                  </View>
                </CustomButton>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
