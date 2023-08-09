import {View} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {Header} from '../components/Header/Header';
import {CustomButton} from '../components/CustomButton';
import {
  useSignupNavigation,
  useSignupRoute,
} from '../navigation/SignupNavigation';
import {Spacer} from '../components/Spacer';
import SingleLineInput from '../components/SingleLineInput';
import {Typography} from '../components/Typography';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import EmailValidator from 'email-validator';

export default function InputEmailScreen() {
  const safeAreaInset = useSafeAreaInsets();
  const navigation = useSignupNavigation<'InputEmail'>();
  const route = useSignupRoute<'InputEmail'>();
  const [inputEmail, setInputEmail] = useState<string>(
    route.params.preInput.email,
  );

  const isValid = useMemo(() => {
    if (!inputEmail.length) {
      return false;
    }

    return EmailValidator.validate(inputEmail);
  }, [inputEmail]);

  function handleEmailSubmit() {
    if (!isValid) {
      return;
    }

    navigation.push('InputName', {
      preInput: route.params.preInput,
      uid: route.params.uid,
      inputEmail: inputEmail,
    });
  }

  const onPressSubmit = useCallback(handleEmailSubmit, [
    inputEmail,
    isValid,
    navigation,
    route.params.preInput,
    route.params.uid,
  ]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Group>
          <Header.Title title="InputEmail" />
        </Header.Group>
        <Header.Icon iconName="close" onPress={() => navigation.goBack()} />
      </Header>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 24,
        }}>
        <SingleLineInput
          value={inputEmail}
          onChangeText={setInputEmail}
          placeholder="Email을 입력해주세요."
          onSubmitEditing={onPressSubmit}
          keyboardType="email-address"
        />
      </View>
      <CustomButton onPress={onPressSubmit}>
        <View style={{backgroundColor: isValid ? 'black' : 'lightgray'}}>
          <Spacer space={16} />
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Typography fontSize={20} color="white">
              다음
            </Typography>
          </View>
          <Spacer space={safeAreaInset.bottom} />
        </View>
      </CustomButton>
    </View>
  );
}
