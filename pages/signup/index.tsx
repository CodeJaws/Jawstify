import Image from 'next/image';
import { useState } from 'react';
import mainLogo from '@/public/assets/icons/mainPurpleLogo.svg';
import mainLogoText from '@/public/assets/icons/logoText.svg';
import styled from 'styled-components';
import { fontStyle } from '@/styles/fontStyle';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/Input/FormInput';
import Button from '@/components/common/Button/Button';
import LoginButton from '@/components/common/Button/LoginButton';
import { onMobile } from '@/styles/mediaQuery';
import Link from 'next/link';
import { COLORS } from '@/styles/palettes';

interface LoginForm {
  email?: string;
  nickname?: string;
  password?: string;
  pwdcheck?: string;
}
function Login() {
  const [values, setValues] = useState({ email: '', password: '' });
  const [isAgreeChecked, setIsAgreeChecked] = useState(false);
  const { register, handleSubmit } = useForm<LoginForm>();

  const onSubmit = (data: any) => {
    setValues(data);
    console.log('data: ', data);
    console.log('values:', values);
  };

  console.log('랜더링');

  return (
    <StyledContainer>
      <StyledLogoContainer>
        <StyledLogoImg src={mainLogo} height={190} width={165} alt="메인 로고" />
        <StyledLogoText src={mainLogoText} height={55} width={198} alt="메인 로고 텍스트" />
        <StyledDescription>첫 방문을 환영합니다!</StyledDescription>
      </StyledLogoContainer>

      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <FormInput label="이메일" register={register('email', { required: true })}></FormInput>
        <FormInput label="닉네임" register={register('nickname', { required: true })}></FormInput>
        <FormInput label="비밀번호" register={register('password', { required: true })}></FormInput>
        <FormInput label="비밀번호 확인" register={register('pwdcheck', { required: true })}></FormInput>
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
        <LoginButton
          usingType="login"
          text="로그인"
          type="submit"
          onClick={() => {
            console.log('dd');
          }}
        ></LoginButton>
      </StyledForm>

      <StyledBottomTextContainer>
        <StyledText>
          이미 가입하셨나요? <StyledLink href="/">로그인하기</StyledLink>
        </StyledText>
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
