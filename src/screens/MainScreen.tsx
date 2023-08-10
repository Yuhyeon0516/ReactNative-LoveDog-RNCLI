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
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from 'react-native-reanimated';

export default function MainScreen() {
  const {width} = useWindowDimensions();
  const dog = useSelector<TypeRootReducer, TypeDog | null>(
    state => state.dog.currentDog,
  );

  const dispatch = useDispatch<TypeDogDispatch>();
  const likeOffset = useSharedValue(0);
  const notLikeOffset = useSharedValue(0);

  function handlePressLike() {
    if (!dog) {
      return;
    }
    dispatch(likeDog(dog));
    likeOffset.value = withRepeat(
      withSpring(-10, {
        duration: 400,
      }),
      2,
      true,
    );

    dispatch(getDog());
  }
  const onPressLike = useCallback(handlePressLike, [dispatch, dog, likeOffset]);

  function handlePressNotLike() {
    notLikeOffset.value = withRepeat(
      withSpring(-10, {
        duration: 400,
      }),
      2,
      true,
    );
    dispatch(getDog());
  }
  const onPressNotLike = useCallback(handlePressNotLike, [
    dispatch,
    notLikeOffset,
  ]);

  const start = useSharedValue({x: 0, y: 0});
  const imageOffset = useSharedValue({x: 0, y: 0});

  const gesture = Gesture.Pan()
    .runOnJS(true)
    .onBegin(() => {})
    .onUpdate(event => {
      imageOffset.value = {
        x: event.translationX + start.value.x,
        y: start.value.y,
      };
    })
    .onFinalize(() => {
      if (imageOffset.value.x < -150) {
        runOnJS(onPressLike)();
      }

      if (imageOffset.value.x > 150) {
        runOnJS(onPressNotLike)();
      }

      imageOffset.value = {
        x: 0,
        y: 0,
      };
    });

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            imageOffset.value.x,
            [-200, 0, 200],
            [-100, 0, 100],
          ),
        },
        {
          translateY: interpolate(
            imageOffset.value.x,
            [-200, 0, 200],
            [-50, 0, -50],
          ),
        },
        {
          rotate: `${interpolate(
            imageOffset.value.x,
            [-200, 0, 200],
            [30, 0, -30],
          )}deg`,
        },
      ],
    };
  });

  const likeAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: likeOffset.value,
        },
      ],
    };
  });

  const notLikeAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: notLikeOffset.value,
        },
      ],
    };
  });

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
            <GestureDetector gesture={gesture}>
              <Animated.View
                style={{alignItems: 'center', justifyContent: 'center'}}>
                <Animated.View style={imageAnimatedStyle}>
                  <RemoteImage
                    url={dog.photoUrl}
                    width={width * 0.7}
                    height={width * 0.7}
                  />
                </Animated.View>
              </Animated.View>
            </GestureDetector>
            <Spacer space={64} />
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1, marginRight: 4}}>
                <CustomButton onPress={onPressLike}>
                  <Animated.View
                    style={[
                      {
                        paddingVertical: 12,
                        backgroundColor: 'red',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 4,
                      },
                      likeAnimatedStyle,
                    ]}>
                    <Icon iconName="thumbs-up" color="white" size={16} />
                    <Typography fontSize={20} color="white">
                      Like
                    </Typography>
                  </Animated.View>
                </CustomButton>
              </View>
              <View style={{flex: 1, marginLeft: 4}}>
                <CustomButton onPress={onPressNotLike}>
                  <Animated.View
                    style={[
                      {
                        paddingVertical: 12,
                        backgroundColor: 'blue',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 4,
                      },
                      notLikeAnimatedStyle,
                    ]}>
                    <Icon iconName="thumbs-down" color="white" size={16} />
                    <Typography fontSize={20} color="white">
                      Not Like
                    </Typography>
                  </Animated.View>
                </CustomButton>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
