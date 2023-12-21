import { fontStyle } from '@/styles/fontStyle';
import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '@/styles/palettes';
import { StyledErrorText, StyledInput, StyledInputContainer, StyledLabel, VioletStar } from '../Input.style';
import { NO_VALUE_ERROR } from '@/constants/Input';

interface Props {
  label: string;
  inputValue?: string;
  placeholder?: string;
  errorMessage?: string;
  isNecessary?: boolean;
  isTextArea?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

/**
 * Modal Basic Input
 * @param label input 라벨 텍스트
 * @param inputValue 부모 컴포넌트에서 제어하는 input 텍스트 값
 * @param placeholder input placeholder 텍스트
 * @param errorMessage 부모 컴포넌트에서 제어하는 input에 띄우고자 하는 에러 메세지, exist하면 error design 표시
 * @param isNecessary 필수 입력 칸 여부, true일 경우 별표 표시
 * @param isTextArea textArea 여부, true일 경우 input 대신 textarea return
 * @param onChange 부모 컴포넌트에서 제어하는 input onChange 재어 함수
 * */
function BasicInput({
  label = '',
  inputValue = '',
  placeholder = '',
  errorMessage = '',
  isNecessary = false,
  isTextArea = false,
  onChange,
}: Props) {
  const [isNoVal, setIsNoVal] = useState<boolean>(false);

  const defaultPlaceholder = label + '을 입력해 주세요';
  const hasError = errorMessage !== '';

  const handleBlur = () => {
    isNecessary && inputValue === '' ? setIsNoVal(true) : setIsNoVal(false);
  };
  return (
    <StyledInputContainer>
      <StyledLabel>
        {label}
        {isNecessary && <VioletStar>*</VioletStar>}
      </StyledLabel>
      {isTextArea ? (
        <StyledTextarea
          value={inputValue}
          placeholder={placeholder || defaultPlaceholder}
          $error={isNoVal || hasError}
          onChange={onChange}
          onBlur={handleBlur}
        />
      ) : (
        <StyledInput
          value={inputValue}
          placeholder={placeholder || defaultPlaceholder}
          $error={isNoVal || hasError}
          onChange={onChange}
          onBlur={handleBlur}
        />
      )}
      {(isNoVal || hasError) && <StyledErrorText>{errorMessage || NO_VALUE_ERROR}</StyledErrorText>}
    </StyledInputContainer>
  );
}

export default BasicInput;

const StyledTextarea = styled.textarea<{ $error: boolean }>`
  width: 100%;
  padding: 15px 16px;
  border-radius: 8px;
  border: 1px solid ${({ $error }) => ($error ? COLORS.RED_D6 : COLORS.GRAY_D9)};
  background-color: ${COLORS.WHITE_FF};
  color: ${COLORS.BLACK_33};
  ${fontStyle(16, 400)}

  &:hover,
  &:focus,
  &:active {
    border: 1px solid ${({ $error }) => ($error ? COLORS.RED_D6 : COLORS.VIOLET_55)};
    color: ${COLORS.BLACK_33};
    outline: none;
  }
`;
