import GoogleLoginButton from '@/components/GoogleLogin/GoogleLogin';
import FormInput from '@/components/Input/FormInput';
import Modal from '@/components/Modal/Modal';
import LoginButton from '@/components/common/Button/LoginButton';
import * as C from '@/constants/SignValidate';
import useAuth, { SignUpFormValue } from '@/hooks/Auth/useAuth';
import useRedirectByLogin from '@/hooks/Auth/useRedirectByLogin';
import * as L from '@/pages/login';
import mainLogoText from '@/public/assets/images/title.png';
import mainLogo from '@/public/assets/images/transJaws.png';
import { fontStyle } from '@/styles/fontStyle';
import { COLORS } from '@/styles/palettes';

import { useRouter } from 'next/router';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

function SignUp() {
  useRedirectByLogin();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SignUpFormValue>({ mode: 'onBlur' });

  const {
    isBtnActive,
    onSignUpSubmit,
    alertMessage,
    handleChange,
    isModalOpen,
    setIsModalOpen,
    isAgreeChecked,
    setIsAgreeChecked,
  } = useAuth(getValues, ['email', 'password', 'nickname', 'pwdcheck']);

  const passwordRef = useRef<string | null | undefined>(null);
  passwordRef.current = getValues('password');

  return (
    <StyledContainer>
      <L.StyledLogoContainer href={'/'}>
        <L.StyledLogoImg src={mainLogo} height={190} width={190} alt="메인 로고" />
        <L.StyledLogoText src={mainLogoText} height={55} width={240} alt="메인 로고 텍스트" />
        <L.StyledDescription>첫 방문 조습니다!</L.StyledDescription>
      </L.StyledLogoContainer>

      <StyledForm2 onSubmit={handleSubmit(onSignUpSubmit)}>
        <StyledFormInputContainer>
          <FormInput
            label="이메일"
            register={register('email', {
              required: C.NO_VALUE_ERROR,
              pattern: { value: C.EMAIL_VALIDATE_PATTERN, message: C.EMAIL_ERROR.FORMAT_ERROR },
              onChange: handleChange,
            })}
            errorMessage={errors?.email?.message || alertMessage?.serverMessage}
          />
          <FormInput
            label="닉네임"
            register={register('nickname', { required: C.NO_VALUE_ERROR, onChange: handleChange })}
            errorMessage={errors?.nickname?.message}
          />
        </StyledFormInputContainer>
        <FormInput
          label="비밀번호"
          register={register('password', {
            required: C.NO_VALUE_ERROR,
            pattern: { value: C.PWD_VALIDATE_PATTERN, message: C.PWD_ERROR.FORMAT_ERROR },
            minLength: { value: 8, message: C.PWD_ERROR.MIN_LENGTH_ERROR },
            onChange: handleChange,
          })}
          errorMessage={errors?.password?.message}
        />
        <FormInput
          label="비밀번호 확인"
          register={register('pwdcheck', {
            required: C.NO_VALUE_ERROR,
            validate: { pwdNotSame: (value) => value === passwordRef.current || C.PWD_CHECK_ERROR.PWD_NOT_SAME },
            onChange: handleChange,
          })}
          errorMessage={errors?.pwdcheck?.message}
        />
        <StyledCheckBoxContainer>
          <StyledCheckBox
            type="checkbox"
            checked={isAgreeChecked}
            onChange={() => {
              setIsAgreeChecked((prev) => !prev);
            }}
          />
          <StyledText>이용약관 조습니다.</StyledText>
        </StyledCheckBoxContainer>
        {!isAgreeChecked && <StyledAgreeNotCheckedText>{alertMessage.noCheck}</StyledAgreeNotCheckedText>}
        <LoginButton active={isBtnActive} usingType="login" text="회원가입" type="submit" margin="-3px 0 0" />
      </StyledForm2>
      <GoogleLoginButton />

      <StyledBottomTextContainer>
        <StyledText>
          이미 가입하셨나요? <L.StyledLink href="/login">로그인하러 가기</L.StyledLink>
        </StyledText>
      </StyledBottomTextContainer>
      {isModalOpen && (
        <Modal
          isSingleButton
          title=""
          description={alertMessage.serverMessage}
          onOkClick={() => {
            setIsModalOpen(false);
            if (alertMessage.serverMessage === C.SIGNUP_SUCCESS_MSG) router.push('/login');
          }}
        />
      )}
    </StyledContainer>
  );
}

export default SignUp;

const StyledContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 17px;
  background-color: var(--sign-bg);
`;

const StyledFormInputContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledForm2 = styled(L.StyledForm)`
  margin-bottom: 0;
`;
const StyledCheckBoxContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  margin-bottom: 7px;
`;

const StyledBottomTextContainer = styled.div`
  margin-top: -5px;
`;

const StyledCheckBox = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid ${COLORS.GRAY_D9};
  background: ${COLORS.WHITE_FF};

  &:checked {
    background: ${COLORS.VIOLET_55};
  }
`;

const StyledText = styled.h5`
  text-align: center;
  ${fontStyle(16, 400)}
`;

export const StyledAgreeNotCheckedText = styled.p`
  color: ${COLORS.RED_D6};
  ${fontStyle(14, 400)};
  margin-top: -10px;
`;
