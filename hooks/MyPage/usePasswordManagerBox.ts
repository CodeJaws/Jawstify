import api from '@/apis/api';
import {
  EQUAL_NOW_PWD_ERROR,
  NEW_PWD_EIGHT_ERROR,
  NEW_PWD_INPUT_ERROR,
  NOW_PWD_NOT_MATCH_ERROR,
  PWD_EIGHT_ERROR,
} from '@/constants/ErrorMsg';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

interface FormProps {
  password: string;
  newPassword: string;
  newPasswordCheck: string;
  errors: {
    password: {
      message: string;
    };
    newPassword: {
      message: string;
    };
    newPasswordCheck: {
      message: string;
    };
  };
}

function usePasswordManagerBox() {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    resetField,
    formState: { errors },
  } = useForm<FormProps>({ mode: 'onBlur' });
  const [isActivate, setActivate] = useState(true);

  const onSubmit = async (formValues: any) => {
    const password = formValues.password;
    const newPassword = formValues.newPassword;
    try {
      await api.auth
        .changePassword({ password, newPassword })
        .then(() => toast.custom('비밀번호 변경 완료', { icon: '🔑' }));
      resetField('password');
      resetField('newPassword');
      resetField('newPasswordCheck');
    } catch (error: any) {
      switch (error.data.message) {
        case PWD_EIGHT_ERROR:
          setError('password', { message: PWD_EIGHT_ERROR });
          break;
        case NOW_PWD_NOT_MATCH_ERROR:
          setError('password', { message: NOW_PWD_NOT_MATCH_ERROR });
          break;
        case NEW_PWD_EIGHT_ERROR:
          setError('newPassword', { message: NEW_PWD_EIGHT_ERROR });
          break;
        case NEW_PWD_INPUT_ERROR:
          setError('newPassword', { message: NEW_PWD_INPUT_ERROR });
          break;
        case EQUAL_NOW_PWD_ERROR:
          setError('newPassword', { message: EQUAL_NOW_PWD_ERROR });
          break;
        default:
          toast.error('비밀번호 변경 에러가 발생 했습니다');
          break;
      }
    }
  };

  const passwordRegister = register('password');
  const newPasswordRegister = register('newPassword');
  const newPasswordCheckRegister = register('newPasswordCheck', {
    validate: (value, formValues) => {
      return value === formValues.newPassword || '비밀번호가 일치하지않습니다';
    },
  });

  const handleCheck = () => {
    const password = getValues('password');
    const newPassword = getValues('newPassword');
    const newPasswordCheck = getValues('newPasswordCheck');
    if (password && newPassword && newPasswordCheck) {
      setActivate(false);
    } else {
      setActivate(true);
    }
  };

  return {
    handleSubmit,
    onSubmit,
    handleCheck,
    passwordRegister,
    newPasswordRegister,
    newPasswordCheckRegister,
    errors,
    isActivate,
  };
}

export default usePasswordManagerBox;
