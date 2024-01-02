import api from '@/apis/api';
import { localStorageSetItem } from '@/utils/localStorage';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FieldValues, Path, UseFormGetValues } from 'react-hook-form';
import useUserData from './global/useUserData';
import * as C from '@/constants/SignValidate';

export interface LoginFormValue {
  email?: string;
  password?: string;
  errors: {
    email: {
      message: string;
    };
    password: {
      message: string;
    };
  };
}

export interface SignUpFormValue {
  email?: string;
  nickname?: string;
  password?: string;
  pwdcheck?: string;
  errors: {
    email: {
      message: string;
    };
    nickname: {
      message: string;
    };
    password: {
      message: string;
    };
    pwdcheck: {
      message: string;
    };
  };
}

const useAuth = <T extends FieldValues>(getValues: UseFormGetValues<T>, inputValues: Path<T>[]) => {
  const initialErrorMsg = {
    serverMessage: '',
    noCheck: '',
  };
  const [alertMessage, setAlertMessage] = useState(initialErrorMsg);
  const [isBtnActive, setIsBtnActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgreeChecked, setIsAgreeChecked] = useState(false);

  const validateBtnActivation = () => {
    if (inputValues.every((value) => getValues(value))) setIsBtnActive(true);
    else setIsBtnActive(false);
  };

  const initServerAlertMessage = () => {
    alertMessage && setAlertMessage(initialErrorMsg);
  };

  const handleChange = () => {
    validateBtnActivation();
    initServerAlertMessage();
  };

  const router = useRouter();
  const { setUser } = useUserData();

  const onLoginSubmit = async (data: LoginFormValue) => {
    let response;
    try {
      response = await api.auth.login({ email: data.email as string, password: data.password as string });
      localStorageSetItem('accessToken', response.accessToken);
      await setUser(response.user);
      response.accessToken && router.push('mydashboard');
      throw Error;
    } catch (e: any) {
      setIsModalOpen(true);
      setAlertMessage({ ...alertMessage, serverMessage: e?.data?.message });
    }
  };

  const onSignUpSubmit = async (data: SignUpFormValue) => {
    if (!isAgreeChecked) {
      setAlertMessage({ ...alertMessage, noCheck: '이용약관에 동의하셔야 합니다.' });
      return;
    } else {
      setAlertMessage({ ...alertMessage, noCheck: '' });
    }

    let response;
    try {
      response = await api.users.signup({
        email: data.email as string,
        nickname: data.nickname as string,
        password: data.password as string,
      });
      setAlertMessage({ ...alertMessage, serverMessage: C.SIGNUP_SUCCESS_MSG });
    } catch (e: any) {
      setIsModalOpen(true);
      setAlertMessage({ ...alertMessage, serverMessage: e?.data?.message });
    }
  };

  useEffect(() => {
    if (alertMessage.serverMessage) setIsModalOpen(true);
    else setIsModalOpen(false);
  }, [alertMessage.serverMessage]);

  return {
    onLoginSubmit,
    onSignUpSubmit,
    alertMessage,
    setAlertMessage,
    isBtnActive,
    handleChange,
    isModalOpen,
    setIsModalOpen,
    isAgreeChecked,
    setIsAgreeChecked,
  };
};

export default useAuth;
