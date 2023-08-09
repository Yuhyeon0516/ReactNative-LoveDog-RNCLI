import {Platform, View} from 'react-native';
import React, {useCallback, useEffect, useRef} from 'react';
import {useRootNavigation, useRootRoute} from '../navigation/RootNavigation';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {Header} from '../components/Header/Header';
import {CustomButton} from '../components/CustomButton';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

export default function TakePhotoScreen() {
  const route = useRootRoute<'TakePhoto'>();
  const navigation = useRootNavigation<'TakePhoto'>();
  const ref = useRef<Camera>(null);

  const devices = useCameraDevices();
  const device = devices.back;

  async function handlePressTakePhoto() {
    const result = await ref.current?.takePhoto();
    if (result) {
      const path = `${Platform.OS === 'android' ? 'file://' : ''}${
        result.path
      }`;

      CameraRoll.save(path, {type: 'photo', album: 'LoveDog'});
      route.params.onTakePhoto(path);
      navigation.goBack();
    }
  }

  const onPressTakePhoto = useCallback(handlePressTakePhoto, [
    navigation,
    route.params,
  ]);

  useEffect(() => {
    Camera.requestCameraPermission();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="사진 촬영" />
        <Header.Icon iconName="close" onPress={() => navigation.goBack()} />
      </Header>
      <View style={{flex: 1}}>
        <View style={{flex: 2}}>
          {device && (
            <Camera
              ref={ref}
              style={{flex: 1}}
              device={device}
              isActive={true}
              photo={true}
            />
          )}
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <CustomButton onPress={onPressTakePhoto}>
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: 'black',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: 'white',
                }}
              />
            </View>
          </CustomButton>
        </View>
      </View>
    </View>
  );
}
