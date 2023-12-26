import Image from 'next/image';
import mainLogo from '@/public/assets/icons/mainPurpleLogo.svg';
import mainLogoText from '@/public/assets/icons/logoText.svg';
import styled from 'styled-components';
import { fontStyle } from '@/styles/fontStyle';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/Input/FormInput';
import LoginButton from '@/components/common/Button/LoginButton';
import { onMobile } from '@/styles/mediaQuery';
import Link from 'next/link';
import { COLORS } from '@/styles/palettes';
import { EMAIL_ERROR, EMAIL_VALIDATE_PATTERN, NO_VALUE_ERROR, PWD_VALIDATE_PATTERN } from '@/constants/SignValidate';

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
  serverError: string;
}
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  const onSubmit = (data: FormValue) => {
    console.log('dd');
    console.log('data: ', data);
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
            required: NO_VALUE_ERROR,
            pattern: { value: EMAIL_VALIDATE_PATTERN, message: EMAIL_ERROR.FORMAT_ERROR },
          })}
          errorMessage={errors?.email?.message}
        />
        <FormInput
          label="비밀번호"
          register={register('password', {
            required: NO_VALUE_ERROR,
          })}
          errorMessage={errors?.password?.message}
        />
        <LoginButton active usingType="login" text="로그인" type="submit"></LoginButton>
      </StyledForm>

      <StyledBottomTextContainer>
        <StyledBottomText>
          회원이 아니신가요? <StyledLink href="/">회원가입하기</StyledLink>
        </StyledBottomText>
      </StyledBottomTextContainer>
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
  gap: 35px;
  background-color: ${COLORS.GRAY_FA};
`;

const StyledLogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  ${onMobile} {
    gap: 18px;
  }
`;

const StyledLogoImg = styled(Image)`
  margin-left: 36px;
  ${onMobile} {
    width: 100px;
    height: 115px;
    margin-left: 22px;
  }
`;
const StyledLogoText = styled(Image)`
  ${onMobile} {
    width: 119px;
    height: 33px;
  }
`;
const StyledDescription = styled.h5`
  ${fontStyle(20, 500)};
  margin-top: -13px;
  ${onMobile} {
    margin-top: -7px;
  }
`;

const StyledForm = styled.form`
  width: min-content;
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const StyledBottomTextContainer = styled.div`
  margin-top: -12px;
`;

const StyledBottomText = styled.h5`
  text-align: center;
  ${fontStyle(16, 400)}
`;

const StyledLink = styled(Link)`
  margin-left: 3px;
  text-decoration: underline;
  color: ${COLORS.VIOLET_55};
`;
