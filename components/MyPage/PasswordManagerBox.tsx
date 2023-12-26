import api from '@/apis/api';
import { EQUAL_NOW_PWD, NEW_PWD_EIGHT, NEW_PWD_INPUT, NOW_PWD_NOT_MATCH, PWD_EIGHT } from '@/constants/ErrorMsg';
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
    formState: { errors },
  } = useForm<FormProps>({ mode: 'onBlur' });
  const [isActivate, setActivate] = useState(true);

  const onSubmit = async (formValues: any) => {
    const password = formValues.password;
    const newPassword = formValues.newPassword;
    try {
      await api.auth.changePassword({ password, newPassword });
    } catch (error: any) {
      switch (error.data.message) {
        case PWD_EIGHT:
          setError('password', { message: PWD_EIGHT });
          break;
        case NOW_PWD_NOT_MATCH:
          setError('password', { message: NOW_PWD_NOT_MATCH });
          break;
        case NEW_PWD_EIGHT:
          setError('newPassword', { message: NEW_PWD_EIGHT });
          break;
        case NEW_PWD_INPUT:
          setError('newPassword', { message: NEW_PWD_INPUT });
          break;
        case EQUAL_NOW_PWD:
          setError('newPassword', { message: EQUAL_NOW_PWD });
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
    if (password && newPassword && newPasswordCheck) setActivate(false);
  };

  return (
    <StyledContainer>
      <StyledTitle>비밀번호 변경</StyledTitle>
      <StyledWrapper onSubmit={handleSubmit(onSubmit)} onChange={handleCheck}>
        <FormInput register={passwordRegister} label="현재 비밀번호" errorMessage={errors.password?.message} />
        <FormInput register={newPasswordRegister} label="새 비밀번호" errorMessage={errors.newPassword?.message} />
        <FormInput
          register={newPasswordCheckRegister}
          label="새 비밀번호 확인"
          errorMessage={errors.newPasswordCheck?.message}
        />
        <StyledButton text={'변경'} size={'small'} isViolet={true} disabled={isActivate} />
      </StyledWrapper>
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

const StyledWrapper = styled.form`
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

const StyledErrorMsg = styled.p`
  color: ${COLORS.RED_D6};
  ${fontStyle(14, 400)};
`;
