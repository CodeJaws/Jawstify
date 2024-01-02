import { useForm } from 'react-hook-form';
import useAuth from '@/hooks/useAuth';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import api from '@/apis/api';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import * as C from '@/constants/SignValidate';
import FormInput from '@/components/Input/FormInput';
import LoginButton from '@/components/common/Button/LoginButton';
import mainLogoText from '@/public/assets/icons/logoText.svg';
import mainLogo from '@/public/assets/icons/mainPurpleLogo.svg';
import Modal from '@/components/Modal/Modal';
import useUserData from '@/hooks/global/useUserData';
import { localStorageSetItem } from '@/utils/localStorage';
import GoogleLoginButton from '@/components/GoogleLogin/GoogleLogin';

interface FormValue {
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
function Login() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValue>({ mode: 'onBlur', shouldFocusError: true, reValidateMode: 'onChange' });

  const { isBtnActive, setAlertMessage, alertMessage, handleChange, isModalOpen, setIsModalOpen } = useAuth(getValues, [
    'email',
    'password',
  ]);

  const router = useRouter();
  const { setUser } = useUserData();
  const onSubmit = async (data: FormValue) => {
    let response;
    try {
      response = await api.auth.login({ email: data.email as string, password: data.password as string });
      localStorageSetItem('accessToken', response.accessToken);
      await setUser(response.user);
      response.accessToken && router.push('/boards');
      throw Error;
    } catch (e: any) {
      setIsModalOpen(true);
      setAlertMessage({ ...alertMessage, serverMessage: e?.data?.message });
    }
  };

  return (
    <StyledContainer>
      <StyledLogoContainer>
        <StyledLogoImg src={mainLogo} height={190} width={165} alt="메인 로고" />
        <StyledLogoText src={mainLogoText} height={55} width={198} alt="메인 로고 텍스트" />
        <StyledDescription>오늘도 만나서 반가워요!</StyledDescription>
      </StyledLogoContainer>

      <StyledForm onSubmit={handleSubmit(onSubmit)}>
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
        <LoginButton active={isBtnActive} usingType="login" text="로그인" type="submit" margin="7px 0 0 "></LoginButton>
      </StyledForm>
      <GoogleLoginButton />

      <StyledBottomTextContainer>
        <StyledBottomText>
          회원이 아니신가요? <StyledLink href="/signup">회원가입하기</StyledLink>
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
  background-color: ${COLORS.GRAY_FA};
`;

export const StyledLogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
  ${onMobile} {
    gap: 18px;
  }
`;

export const StyledLogoImg = styled(Image)`
  margin-left: 36px;
  ${onMobile} {
    width: 100px;
    height: 115px;
    margin-left: 22px;
  }
`;

export const StyledLogoText = styled(Image)`
  ${onMobile} {
    width: 119px;
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
  margin-bottom: -17px;
`;

const StyledBottomTextContainer = styled.div`
  margin-top: -15px;
`;

export const StyledLink = styled(Link)`
  margin-left: 3px;
  text-decoration: underline;
  color: ${COLORS.VIOLET_55};
  text-underline-position: from-font;
`;

const StyledBottomText = styled.h5`
  text-align: center;
  ${fontStyle(16, 400)}
`;

export const StyledServerErrorText = styled.p`
  color: ${COLORS.RED_D6};
  ${fontStyle(14, 400)};
  margin-top: -10px;
`;
