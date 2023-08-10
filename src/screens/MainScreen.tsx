import {View} from 'react-native';
import React, {useEffect} from 'react';
import {Header} from '../components/Header/Header';
import {useDispatch, useSelector} from 'react-redux';
import {TypeRootReducer} from '../store/store';
import {TypeDog} from '../types/TypeDog';
import {TypeDogDispatch, getDog} from '../actions/dog';

export default function MainScreen() {
  const dog = useSelector<TypeRootReducer, TypeDog | null>(
    state => state.dog.currentDog,
  );

  const dispatch = useDispatch<TypeDogDispatch>();

  useEffect(() => {
    dispatch(getDog());
  }, [dispatch]);

  console.log(dog);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Main" />
      </Header>
    </View>
  );
}
