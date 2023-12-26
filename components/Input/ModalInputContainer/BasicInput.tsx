import Button from '@/components/common/Button/Button';
import { NO_VALUE_ERROR } from '@/constants/SignValidate';
import { fontStyle } from '@/styles/fontStyle';
import { COLORS } from '@/styles/palettes';
import { MouseEvent, useState } from 'react';
import styled from 'styled-components';
import { StyledErrorText, StyledInput, StyledInputContainer, StyledLabel, VioletStar } from '../Input.style';
import { onMobile } from '@/styles/mediaQuery';

interface Props {
  label: string;
  inputValue?: string;
  placeholder?: string;
  errorMessage?: string;
  isNecessary?: boolean;
  isTextArea?: boolean;
  onChange: (inputLabel: string, value: string) => void;
  onButtonClick?: (e: MouseEvent<HTMLElement>) => void;
}

/**
 * Modal Basic Input
 * @param label input 라벨 텍스트
 * @param inputValue 부모 컴포넌트에서 제어하는 input 텍스트 값
 * @param placeholder input placeholder 텍스트
 * @param errorMessage 부모 컴포넌트에서 제어하는 input에 띄우고자 하는 에러 메세지, exist하면 error design 표시
 * @param isNecessary 필수 입력 칸 여부, true일 경우 별표 표시
 * @param isTextArea textArea 여부, true일 경우 input 대신 textarea return
 * @param onChange 부모 컴포넌트에서 제어하는 input onChange 함수
 * @param onButtonClick Comment로 쓸 때 Input 안에 있는 버튼의 onClick prop
 * */
function BasicInput({
  label = '',
  inputValue = '',
  placeholder = '',
  errorMessage = '',
  isNecessary = false,
  isTextArea = false,
  onChange,
  onButtonClick = (e) => {},
}: Props) {
  const [isNoValue, setIsNoValue] = useState<boolean>(false);

  const defaultPlaceholder = label + '을 입력해 주세요';
  const hasError = errorMessage !== '';
  const isComment = label === '댓글';

  const handleBlur = () => {
    isNecessary && inputValue === '' ? setIsNoValue(true) : setIsNoValue(false);
  };
  return (
    <StyledInputContainer>
      <StyledLabel>
        {label}
        {isNecessary && <VioletStar>*</VioletStar>}
      </StyledLabel>
      {isTextArea || isComment ? (
        <StyledTextarea
          value={inputValue}
          placeholder={placeholder || defaultPlaceholder}
          $error={isNoValue || hasError}
          $isComment={isComment}
          onChange={(e) => onChange(label, e.target.value)}
          onBlur={handleBlur}
        />
      ) : (
        <StyledInput
          value={inputValue}
          placeholder={placeholder || defaultPlaceholder}
          $error={isNoValue || hasError}
          onChange={(e) => onChange(label, e.target.value)}
          onBlur={handleBlur}
        />
      )}
      {isComment && (
        <StyledInputButton
          text="입력"
          size="small"
          className="commentInput"
          onClick={onButtonClick}
        ></StyledInputButton>
      )}
      {(isNoValue || hasError) && <StyledErrorText>{errorMessage || NO_VALUE_ERROR}</StyledErrorText>}
    </StyledInputContainer>
  );
}

export default BasicInput;

const StyledTextarea = styled.textarea<{ $error: boolean; $isComment: boolean }>`
  width: 100%;
  height: ${({ $isComment }) => ($isComment ? '110px' : '96px')};
  position: relative;
  padding: 15px 16px 45px;
  resize: none;
  border-radius: 8px;
  border: 1px solid ${({ $error }) => ($error ? COLORS.RED_D6 : COLORS.GRAY_D9)};
  background-color: ${COLORS.WHITE_FF};
  color: ${COLORS.BLACK_33};
  ${fontStyle(18, 400)}

  ${onMobile} {
    ${fontStyle(16, 400)}
  }

  &:hover,
  &:focus,
  &:active {
    border: 1px solid ${({ $error }) => ($error ? COLORS.RED_D6 : COLORS.VIOLET_55)};
    color: ${COLORS.BLACK_33};
    outline: none;
  }
`;

const StyledInputButton = styled(Button)`
  position: absolute;
  bottom: 14px;
  right: 12px;
`;
