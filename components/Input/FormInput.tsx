import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import eyeOn from '@/public/assets/icons/eyeon.svg';
import eyeOff from '@/public/assets/icons/eyeoff.svg';
import { isEmailFormatValid, isPwdFormatValid } from '@/utils/validation';
import { DEFAULT_PLACEHOLDER, EMAIL_ERROR, NO_VALUE_ERROR, PWD_ERROR } from '@/constants/Input';
import { StyledInputContainer, StyledLabel, StyledInput, StyledErrorText } from './Input.style';
import { UseFormRegisterReturn } from 'react-hook-form';

const PLACEHOLDER = {
  이메일: DEFAULT_PLACEHOLDER.EMAIL,
  닉네임: DEFAULT_PLACEHOLDER.NICKNAME,
  비밀번호: DEFAULT_PLACEHOLDER.PWD,
  '비밀번호 확인': DEFAULT_PLACEHOLDER.PWD_CHECK,
  '': '',
};
interface Props {
  placeholder?: any;
  errorMessage?: string;
  label?: keyof typeof PLACEHOLDER;
  inputValue?: string;
  type?: string;
  register: UseFormRegisterReturn;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
function Input({ placeholder, errorMessage = '', label = '', inputValue, register, onChange }: Props) {
  const [errorMsg, setErrorMsg] = useState(errorMessage);
  const [isNoVal, setIsNoVal] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState('');

  const isPassword = label.includes('비밀번호');
  const isEmail = label === '이메일';
  const handleVisibility = () => setIsVisible((prev) => !prev);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentVal = e.target.value;
    setValue(currentVal);
    !currentVal ? setIsNoVal(true) : setIsNoVal(false);
    handleErrorState(currentVal, isPassword);
  };

  const handleErrorState = (inputValue: string, isPassword: boolean) => {
    if (isPassword) {
      isPwdFormatValid(inputValue) ? setErrorMsg('') : setErrorMsg(PWD_ERROR.FORMAT_ERROR);
    } else if (isEmail) {
      isEmailFormatValid(inputValue) ? setErrorMsg('') : setErrorMsg(EMAIL_ERROR.FORMAT_ERROR);
    }
  };

  const handleBlur = () => {
    !value ? setIsNoVal(true) : setIsNoVal(false);
  };

  return (
    <StyledInputContainer>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput
        type={!isVisible && isPassword ? 'password' : 'text'}
        $error={isNoVal || Boolean(errorMsg)}
        placeholder={placeholder || PLACEHOLDER[label]}
        value={value}
        {...register}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {isPassword && (
        <StyledEyeButton onClick={handleVisibility} type="button">
          <StyledImage src={isVisible ? eyeOn : eyeOff} width={24} height={24} alt="비밀번호 숨기기" />
        </StyledEyeButton>
      )}
      {(isNoVal || errorMsg) && <StyledErrorText>{errorMsg || NO_VALUE_ERROR}</StyledErrorText>}
    </StyledInputContainer>
  );
}

export default Input;

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
