import Image from 'next/image';
import { useRef, useState } from 'react';
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
import {
  EMAIL_ERROR,
  EMAIL_VALIDATE_PATTERN,
  NO_VALUE_ERROR,
  PWD_CHECK_ERROR,
  PWD_ERROR,
  PWD_VALIDATE_PATTERN,
} from '@/constants/SignValidate';
import { StyledErrorText } from '@/components/Input/Input.style';

interface FormValue {
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
  serverError: string;
}
function SignUp() {
  const [isAgreeChecked, setIsAgreeChecked] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>();

  const passwordRef = useRef<string | null | undefined>(null);
  passwordRef.current = watch('password');

  const onSubmit = (data: FormValue) => {
    isAgreeChecked && console.log('data: ', data, 'signup success!!'); // 회원가입 성공!!
  };

  return (
    <StyledContainer>
      <StyledLogoContainer>
        <StyledLogoImg src={mainLogo} height={190} width={165} alt="메인 로고" />
        <StyledLogoText src={mainLogoText} height={55} width={198} alt="메인 로고 텍스트" />
        <StyledDescription>첫 방문을 환영합니다!</StyledDescription>
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
          label="닉네임"
          register={register('nickname', { required: NO_VALUE_ERROR })}
          errorMessage={errors?.nickname?.message}
        />
        <FormInput
          label="비밀번호"
          register={register('password', {
            required: NO_VALUE_ERROR,
            pattern: { value: PWD_VALIDATE_PATTERN, message: PWD_ERROR.FORMAT_ERROR },
            minLength: { value: 8, message: PWD_ERROR.MIN_LENGTH_ERROR },
          })}
          errorMessage={errors?.password?.message}
        />
        <FormInput
          label="비밀번호 확인"
          register={register('pwdcheck', {
            required: NO_VALUE_ERROR,
            validate: { pwdNotSame: (value) => value === passwordRef.current || PWD_CHECK_ERROR.PWD_NOT_SAME },
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
          <StyledText>이용약관에 동의합니다.</StyledText>
        </StyledCheckBoxContainer>
        <LoginButton active usingType="login" text="회원가입" type="submit"></LoginButton>
        <StyledErrorText>{errors?.serverError?.message}</StyledErrorText>
      </StyledForm>

      <StyledBottomTextContainer>
        <StyledText>
          이미 가입하셨나요? <StyledLink href="/">로그인하기</StyledLink>
        </StyledText>
      </StyledBottomTextContainer>
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

const StyledCheckBoxContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
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

const StyledBottomTextContainer = styled.div`
  margin-top: -12px;
`;

const StyledText = styled.h5`
  text-align: center;
  ${fontStyle(16, 400)}
`;

const StyledLink = styled(Link)`
  margin-left: 3px;
  text-decoration: underline;
  color: ${COLORS.VIOLET_55};
`;
