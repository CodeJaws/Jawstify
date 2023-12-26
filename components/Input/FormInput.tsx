import { DEFAULT_PLACEHOLDER } from '@/constants/Input';
import eyeOff from '@/public/assets/icons/eyeoff.svg';
import eyeOn from '@/public/assets/icons/eyeon.svg';
import Image from 'next/image';
import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styled from 'styled-components';
import { StyledErrorText, StyledInput, StyledInputContainer, StyledLabel } from './Input.style';

// 아래 4개의 이외의 경우 Input 사용 시 Basic Input 사용
// Login, SignForm에 쓰이는 Input들
const PLACEHOLDER = {
  이메일: DEFAULT_PLACEHOLDER.EMAIL,
  닉네임: DEFAULT_PLACEHOLDER.NICKNAME,
  비밀번호: DEFAULT_PLACEHOLDER.PWD,
  '비밀번호 확인': DEFAULT_PLACEHOLDER.PWD_CHECK,
  '현재 비밀번호': DEFAULT_PLACEHOLDER.NOW_PWD,
  '새 비밀번호': DEFAULT_PLACEHOLDER.NEW_PWD,
  '새 비밀번호 확인': DEFAULT_PLACEHOLDER.NEW_PWD_CHECK,
  '': '',
};

/**
 * @param label input 라벨 텍스트
 * @param inputValue 부모 컴포넌트에서 제어하는 input 텍스트 값
 * @param placeholder input placeholder 텍스트
 * @param errorMessage 부모 컴포넌트에서 제어하는 input에 띄우고자 하는 에러 메세지, exist하면 error design 표시
 * @param onChange 부모 컴포넌트에서 제어하는 input onChange 함수
 * */
interface Props {
  label: keyof typeof PLACEHOLDER;
  inputValue?: string;
  placeholder?: string;
  errorMessage?: string;
  register: UseFormRegisterReturn;
}
function FormInput({ label = '', placeholder, errorMessage = '', register }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  const isPassword = label.slice(0, 3).includes('비밀번호');
  const hasError = errorMessage !== '';

  const handleVisibility = () => setIsVisible((prev) => !prev);

  return (
    <StyledInputContainer>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput
        type={!isVisible && isPassword ? 'password' : 'text'}
        placeholder={placeholder || PLACEHOLDER[label]}
        $error={hasError}
        {...register}
      />
      {isPassword && (
        <StyledEyeButton onClick={handleVisibility} type="button">
          <StyledImage src={isVisible ? eyeOff : eyeOn} width={24} height={24} alt="비밀번호 숨기기" />
        </StyledEyeButton>
      )}
      {hasError && <StyledErrorText>{errorMessage}</StyledErrorText>}
    </StyledInputContainer>
  );
}

export default FormInput;

const StyledImage = styled(Image)`
  border: none;
`;

const StyledEyeButton = styled.button`
  position: absolute;
  right: 16px;
  top: 41px;
  border: none;
  background: none;
`;
