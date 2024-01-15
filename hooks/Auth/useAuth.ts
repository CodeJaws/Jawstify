import api from '@/apis/api';
import { localStorageSetItem } from '@/utils/localStorage';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FieldValues, Path, UseFormGetValues } from 'react-hook-form';
import useUserData from '../global/useUserData';
import * as C from '@/constants/SignValidate';
import { useLogin } from '@/apis/queries/auth';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { LoginItem } from '@/types/api';
import useDidMountEffect from '../Common/useDidMountEffect';

export interface LoginFormValue {
  email?: string;
  password?: string;
  errors?: {
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
  errors?: {
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

const useAuth = <T extends FieldValues>(getValues?: UseFormGetValues<T>, inputValues?: Path<T>[]) => {
  const initialErrorMsg = {
    serverMessage: '',
    noCheck: '',
  };
  const [alertMessage, setAlertMessage] = useState(initialErrorMsg);
  const [isBtnActive, setIsBtnActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgreeChecked, setIsAgreeChecked] = useState(false);

  const router = useRouter();
  const { setUser } = useUserData();
  const { mutate: Login, error } = useLogin();

  const queryClient = useQueryClient();
  const loginResponse = queryClient.getQueryData(['loginData']) as LoginItem;

  const validateBtnActivation = () => {
    if (inputValues === undefined || getValues === undefined) return;
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

  const onLoginSubmit = async (data: LoginFormValue) => {
    try {
      await handleLogin(data.email as string, data.password as string);
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

    try {
      await handleSignUp(data);
      setAlertMessage({ ...alertMessage, serverMessage: C.SIGNUP_SUCCESS_MSG });
    } catch (e: any) {
      setIsModalOpen(true);
      setAlertMessage({ ...alertMessage, serverMessage: e?.data?.message });
    }
  };

  const handleLogin = async (email: string, password: string) => {
    await Login({ email, password });
  };

  const handleSignUp = async (data: SignUpFormValue) => {
    const response = await api.users.signup({
      email: data.email as string,
      nickname: data.nickname as string,
      password: data.password as string,
    });
  };

  useEffect(() => {
    if (alertMessage.serverMessage) setIsModalOpen(true);
    else setIsModalOpen(false);
  }, [alertMessage.serverMessage]);

  useEffect(() => {
    const setUserData = async () => {
      await setUser(loginResponse.user);
    };
    if (loginResponse?.accessToken) {
      console.log(loginResponse?.accessToken);
      localStorageSetItem('accessToken', loginResponse?.accessToken);
      setUserData();
      loginResponse.accessToken && router.push('mydashboard');
    }
  }, [loginResponse]);

  return {
    onLoginSubmit,
    onSignUpSubmit,
    handleLogin,
    handleSignUp,
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
