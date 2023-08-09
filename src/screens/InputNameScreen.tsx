import {View} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Header} from '../components/Header/Header';
import {CustomButton} from '../components/CustomButton';
import {Typography} from '../components/Typography';
import {useRootNavigation} from '../navigation/RootNavigation';
import {
  useSignupNavigation,
  useSignupRoute,
} from '../navigation/SignupNavigation';
import SingleLineInput from '../components/SingleLineInput';
import {Spacer} from '../components/Spacer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RemoteImage} from '../components/RemoteImage';
import {Icon} from '../components/Icons';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from '@alessiocancian/react-native-actionsheet';

export default function InputNameScreen() {
  const safeAreaInset = useSafeAreaInsets();
  const navigation = useRootNavigation<'Signup'>();
  const signupNavigation = useSignupNavigation<'InputName'>();
  const route = useSignupRoute<'InputName'>();
  const actionSheetRef = useRef<ActionSheet>(null);
  const [inputName, setInputName] = useState<string>(
    route.params.preInput.name,
  );
  const [selectedPhoto, setSelectedPhoto] = useState<{uri: string} | null>(
    null,
  );
  const [profileImage, setProfileImage] = useState<string>(
    route.params.preInput.profileImage,
  );

  const isValid = useMemo(() => {
    return true;
  }, []);

  function handleNameSubmit() {
    navigation.replace('MainTab');
  }

  const onPressSubmit = useCallback(handleNameSubmit, [navigation]);

  async function handlePressProfileImageUsingAlbum() {
    const photoResult = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    });

    setSelectedPhoto({uri: photoResult.path});
  }

  function actionSheetShow() {
    actionSheetRef.current?.show();
  }

  const onPressProfileImage = useCallback(actionSheetShow, []);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Group>
          <Header.Icon
            iconName="arrow-back"
            onPress={() => signupNavigation.goBack()}
          />
          <Header.Title title="InputName" />
        </Header.Group>
      </Header>

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 24,
        }}>
        <CustomButton onPress={onPressProfileImage}>
          <View style={{width: 100, height: 100}}>
            {profileImage ? (
              <>
                <RemoteImage
                  width={100}
                  height={100}
                  url={selectedPhoto?.uri || profileImage}
                  style={{borderRadius: 50}}
                />
                <View style={{position: 'absolute', right: 0, bottom: 0}}>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: 'gray',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon iconName="add" size={16} color="white" />
                  </View>
                </View>
              </>
            ) : (
              <View
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  backgroundColor: 'gray',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon iconName="add" size={32} color="black" />
              </View>
            )}
          </View>
        </CustomButton>
        <Spacer space={24} />
        <SingleLineInput
          value={inputName}
          onChangeText={setInputName}
          placeholder="이름을 입력해주세요."
          onSubmitEditing={onPressSubmit}
        />
      </View>
      <CustomButton onPress={onPressSubmit}>
        <View style={{backgroundColor: isValid ? 'black' : 'lightgray'}}>
          <Spacer space={16} />
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Typography fontSize={20} color="white">
              회원가입
            </Typography>
          </View>
          <Spacer space={safeAreaInset.bottom} />
        </View>
      </CustomButton>

      <ActionSheet
        ref={actionSheetRef}
        options={['사진 촬영하여 선택', '앨범에서 선택', '취소']}
        cancelButtonIndex={2}
        onPress={async index => {
          if (index === 1) {
            await handlePressProfileImageUsingAlbum();
          }
        }}
      />
    </View>
  );
}
