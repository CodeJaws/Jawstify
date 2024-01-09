import ContentChip from '@/components/Chip/ContentChip';
import { StyledLabel } from '@/components/Input/Input.style';
import useTagInput from '@/hooks/Common/useTagInput';
import { fontStyle } from '@/styles/fontStyle';
import { COLORS } from '@/styles/palettes';
import { MouseEvent } from 'react';
import styled from 'styled-components';

export interface TagProps {
  inputValue?: string;
  label?: string;
  defaultValue?: string[] | null;
  onChange: (inputLabel: string, value: Tag[]) => void;
  onButtonClick?: (e: MouseEvent<HTMLElement>) => void;
}

export interface Tag {
  value: string;
  color: string;
  backgroundColor: string;
}
/**
 * Modal Tag Input
 * @param label input 라벨 텍스트
 * @param onChange 부모 컴포넌트에서 제어하는 input onChange 함수
 * */
function TagInput({ label = '태그', onChange, defaultValue }: TagProps) {
  const { tags, value, handleDeleteClick, handleInputChange, handleOnEnterKeyUp } = useTagInput({
    defaultValue,
    onChange,
  });

  return (
    <div>
      <StyledLabel>{label}</StyledLabel>
      <StyledInputContainer>
        {tags &&
          tags.map((value, index) => (
            <ContentChip text={value.value} key={index} backgroundColor={value.backgroundColor} color={value.color}>
              <StyledDeleteBtn
                onClick={(e: MouseEvent<HTMLElement>) => handleDeleteClick(value.value)}
                $color={value.color}
              >
                x
              </StyledDeleteBtn>
            </ContentChip>
          ))}
        {tags.length !== 0 ? (
          <StyledInput value={value} onChange={handleInputChange} onKeyUp={handleOnEnterKeyUp} />
        ) : (
          <StyledInput
            value={value}
            onChange={handleInputChange}
            onKeyUp={handleOnEnterKeyUp}
            placeholder="입력 후 Enter"
          />
        )}
      </StyledInputContainer>
    </div>
  );
}

export default TagInput;

const StyledInput = styled.input`
  width: auto;
  color: var(--content-main);
  ${fontStyle(16, 400)}
  border: none;
  background: transparent;
  padding: 13px 10px 15px;
`;

const StyledInputContainer = styled.div`
  width: 100%;
  padding-left: 5px;
  border-radius: 8px;
  border: 1px solid var(--input-border);
  background-color: var(--input-bg);
  color: ${COLORS.BLACK_33};
  ${fontStyle(16, 400)};
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  &:hover,
  &:focus,
  &:active {
    border: 1px solid ${COLORS.VIOLET_55};
    color: var(--content-main);
    outline: none;
  }
`;

const StyledDeleteBtn = styled.button<{ $color: string }>`
  font-size: 12px;
  font-weight: 700;
  padding: 0 2px 3px 4px;
  color: ${({ $color }) => $color};
`;
