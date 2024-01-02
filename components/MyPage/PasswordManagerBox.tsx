import api from '@/apis/api';
import {
  EQUAL_NOW_PWD_ERROR,
  NEW_PWD_EIGHT_ERROR,
  NEW_PWD_INPUT_ERROR,
  NOW_PWD_NOT_MATCH_ERROR,
  PWD_EIGHT_ERROR,
} from '@/constants/ErrorMsg';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { styled } from 'styled-components';
import FormInput from '../Input/FormInput';
import Button from '../common/Button/Button';

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

function PasswordManagerBox() {
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
      await api.auth.changePassword({ password, newPassword }).then(() => alert('비밀번호 변경 완료 🔑'));
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

  return (
    <StyledContainer>
      <StyledTitle>비밀번호 변경</StyledTitle>
      <StyledForm onSubmit={handleSubmit(onSubmit)} onChange={handleCheck}>
        <FormInput register={passwordRegister} label="현재 비밀번호" errorMessage={errors.password?.message} />
        <FormInput register={newPasswordRegister} label="새 비밀번호" errorMessage={errors.newPassword?.message} />
        <FormInput
          register={newPasswordCheckRegister}
          label="새 비밀번호 확인"
          errorMessage={errors.newPasswordCheck?.message}
        />
        <StyledButton text={'변경'} size={'small'} isViolet={true} disabled={isActivate} />
      </StyledForm>
    </StyledContainer>
  );
}

export default PasswordManagerBox;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 620px;
  height: auto;
  margin-top: 12px;
  gap: 32px;
  padding: 32px 28px 28px 28px;
  border-radius: 8px;
  background: ${COLORS.WHITE_FF};
  background: var(--content-color);

  ${onTablet} {
    width: 100%;
    height: auto;
  }
  ${onMobile} {
    width: 100%;
    height: auto;
    gap: 24px;
  }
`;

const StyledTitle = styled.p`
  ${fontStyle(24, 700)}
  ${onMobile} {
    font-size: 2rem;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
`;

const StyledButton = styled(Button)`
  margin-left: auto;

  ${onMobile} {
    width: 84px;
    gap: 16px;
  }
`;
