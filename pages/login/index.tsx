import GoogleLoginButton from '@/components/GoogleLogin/GoogleLogin';
import FormInput from '@/components/Input/FormInput';
import Modal from '@/components/Modal/Modal';
import LoginButton from '@/components/common/Button/LoginButton';
import * as C from '@/constants/SignValidate';
import useAuth, { LoginFormValue } from '@/hooks/useAuth';
import useRedirectByLogin from '@/hooks/useRedirectByLogin';
import mainLogoText from '@/public/assets/images/title.png';
import mainLogo from '@/public/assets/images/transJaws.png';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

function Login() {
  useRedirectByLogin();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginFormValue>({ mode: 'onBlur', shouldFocusError: true, reValidateMode: 'onChange' });

  const { isBtnActive, onLoginSubmit, alertMessage, handleChange, isModalOpen, setIsModalOpen } = useAuth(getValues, [
    'email',
    'password',
  ]);

  return (
    <>
      <Helmet>
        <title>로그인 - Jawstify</title>
      </Helmet>
      <StyledContainer>
        <StyledLogoContainer href={'/'}>
          <StyledLogoImg src={mainLogo} height={190} width={190} alt="메인 로고" />
          <StyledLogoText src={mainLogoText} height={55} width={240} alt="메인 로고 텍스트" />
          <StyledDescription>오늘도 만나서 조습니다!</StyledDescription>
        </StyledLogoContainer>

        <StyledForm onSubmit={handleSubmit(onLoginSubmit)}>
          <FormInput
            label="이메일"
            register={register('email', {
              required: C.NO_VALUE_ERROR,
              pattern: { value: C.EMAIL_VALIDATE_PATTERN, message: C.EMAIL_ERROR.FORMAT_ERROR },
              onChange: handleChange,
            })}
            errorMessage={errors?.email?.message}
          />
          <FormInput
            label="비밀번호"
            register={register('password', {
              required: C.NO_VALUE_ERROR,
              onChange: handleChange,
            })}
            errorMessage={errors?.password?.message}
          />
          <LoginButton
            active={isBtnActive}
            usingType="login"
            text="로그인"
            type="submit"
            margin="7px 0 -15px "
          ></LoginButton>
        </StyledForm>
        <GoogleLoginButton />

        <StyledBottomTextContainer>
          <StyledBottomText>
            회원이 아니신가요? <StyledLink href="/signup">회원가입 하기</StyledLink>
          </StyledBottomText>
        </StyledBottomTextContainer>
        {isModalOpen && (
          <Modal
            isSingleButton
            title=""
            description={alertMessage.serverMessage}
            onOkClick={() => {
              setIsModalOpen(false);
            }}
          />
        )}
      </StyledContainer>
    </>
  );
}

export default Login;

const StyledContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  background-color: var(--sign-bg);
`;

export const StyledLogoContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
  ${onMobile} {
    gap: 18px;
  }
`;

export const StyledLogoImg = styled(Image)`
  ${onMobile} {
    width: 120px;
    height: 115px;
  }
`;

export const StyledLogoText = styled(Image)`
  ${onMobile} {
    width: 130px;
    height: 33px;
  }
`;

export const StyledDescription = styled.h5`
  ${fontStyle(20, 500)};
  margin-top: -13px;
  ${onMobile} {
    margin-top: -7px;
  }
`;

export const StyledForm = styled.form`
  width: min-content;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const StyledBottomTextContainer = styled.div`
  margin-top: -15px;
  color: var(--sign-main);
`;

export const StyledLink = styled(Link)`
  margin-left: 3px;
  text-decoration: underline;
  color: ${COLORS.VIOLET_55};
  text-underline-position: from-font;
`;

const StyledBottomText = styled.h5`
  color: var(--content-main);
  text-align: center;
  ${fontStyle(16, 400)}
`;

export const StyledServerErrorText = styled.p`
  color: ${COLORS.RED_D6};
  ${fontStyle(14, 400)};
  margin-top: -10px;
`;
