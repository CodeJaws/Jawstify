import ContentChip from '@/components/Chip/ContentChip';
import { StyledLabel } from '@/components/Input/Input.style';
import { TAG_COLOR } from '@/constants/ModalInput';
import { fontStyle } from '@/styles/fontStyle';
import { COLORS } from '@/styles/palettes';

import { ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useState } from 'react';
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
function TagInput({ label = '태그', onChange, defaultValue: defaultTagStringList }: TagProps) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [value, setValue] = useState<string>('');

  const getFormattedTagEl = () => {
    if (!defaultTagStringList) return;
    const splitTag = defaultTagStringList.map((val) => val.split('/'));
    const formattedTag = splitTag.map((val) => ({
      value: val[0],
      color: val[1],
      backgroundColor: val[2],
    }));
    return formattedTag;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleDeleteClick = (selectedValue: string) => {
    setTags((prev) => prev.filter((prevTags) => prevTags.value !== selectedValue));
  };

  const handleOnEnterKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || value === '') return;

    const ranVal = Math.floor(Math.random() * 4);
    const TagColors = TAG_COLOR[ranVal];
    const newTagEl = { value: value, backgroundColor: TagColors[0], color: TagColors[1] };

    setTags((prev) => {
      if (prev.find((prevTags) => prevTags.value === newTagEl.value)) return prev;
      return [...prev, newTagEl];
    });

    setValue('');
  };

  useEffect(() => {
    if (defaultTagStringList) {
      const formatTags = getFormattedTagEl() as Tag[];
      setTags(formatTags);
    }
  }, []);

  useEffect(() => {
    onChange(label, tags);
  }, [tags]);

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
