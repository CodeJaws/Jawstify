import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { FieldValues, Path, UseFormGetValues } from 'react-hook-form';
import { setCookie } from 'cookies-next';

import useUserData from '../global/useUserData';
import * as C from '@/constants/SignValidate';
import { useLogin } from '@/apis/queries/auth';
import { LoginItem } from '@/types/api';
import { useSignup } from '@/apis/queries/users';

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
  const { mutate: Login, errorMessage: loginErrorMsg } = useLogin();
  const { mutate: SignUp, errorMessage: signUpErrorMsg } = useSignup();

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
      if (loginErrorMsg) throw Error;
    } catch (e: any) {
      setIsModalOpen(true);
      setAlertMessage({ ...alertMessage, serverMessage: loginErrorMsg });
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
      if (signUpErrorMsg) throw Error;
    } catch (e: any) {
      setIsModalOpen(true);
      setAlertMessage({ ...alertMessage, serverMessage: signUpErrorMsg });
      return;
    }
    setAlertMessage({ ...alertMessage, serverMessage: C.SIGNUP_SUCCESS_MSG });
  };

  const handleLogin = async (email: string, password: string) => {
    await Login({ email, password });

    if (loginResponse?.accessToken) {
      await setCookie('accessToken', loginResponse?.accessToken);
      await setUser(loginResponse.user);
      alert(`${loginResponse.user.nickname}님 환영합니다!`);
      router.push('mydashboard');
    }
  };

  const handleSignUp = async (data: SignUpFormValue) => {
    await SignUp({
      email: data.email as string,
      nickname: data.nickname as string,
      password: data.password as string,
    });
  };

  useEffect(() => {
    if (alertMessage.serverMessage) setIsModalOpen(true);
    else setIsModalOpen(false);
  }, [alertMessage.serverMessage]);

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
