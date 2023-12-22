import 'rsuite/dist/rsuite.css';
import { useState } from 'react';
import styled from 'styled-components';
import { TagPicker } from 'rsuite';
import ContentChip from '@/components/Chip/ContentChip';
import { COLORS } from '@/styles/palettes';
import { TAG_DATA } from '@/constants/Input';
import { DEFAULT_PLACEHOLDER, TAG_COLOR } from '@/constants/Input';
import { StyledInputContainer, StyledLabel } from '../Input.style';

interface colorTagProp {
  [value: string]: {
    color: string;
    backgroundColor: string;
  };
}

interface Props {
  label?: string;
  placeholder?: string;
  getValue?: (value: colorTagProp) => void;
}

/**
 * @param label input 라벨 텍스트
 * @param placeholder input placeholder 텍스트
 * @param getValue 현재 컴포넌트에서 부모 컴포넌트로 선택된 값 넘겨 보낼 부모 컴포넌트의 함수
 * */
function TagInput({ label = '태그', placeholder = DEFAULT_PLACEHOLDER.TAG, getValue }: Props) {
  const [colorTagList, setColorTagList] = useState<colorTagProp>({});

  const createNewTag = (value: any, TagColors: any) => {
    setColorTagList((prev) => ({
      ...prev,
      [value[value.length - 1]]: { backgroundColor: TagColors[0], color: TagColors[1] },
    }));
  };

  //getValue(colorTagList); // --> 부모 컴포넌트에서 getValue 넘겨줘서 선택 값 넘겨받으면 됨!

  return (
    <StyledInputContainer>
      <StyledLabel2>{label}</StyledLabel2>
      <TagPicker
        data={TAG_DATA}
        creatable
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '8px 8px 8px 0',
          display: 'flex',
          alignItems: 'center',
          borderColor: COLORS.GRAY_D9,
          boxShadow: 'none',
        }}
        menuStyle={{
          width: 300,
          color: COLORS.BLACK_33,
          borderTopColor: COLORS.VIOLET_55,
          accentColor: COLORS.VIOLET_55,
        }}
        listProps={{
          itemSize: 1,
        }}
        onCreate={(value, item) => {
          const ranVal = Math.floor(Math.random() * 4);
          const TagColors = TAG_COLOR[ranVal];
          createNewTag(value, TagColors);
        }}
        renderValue={(value, items, tags) => {
          return items.map((item: { value: string }, index: number) => (
            <ContentChip
              text={item.value}
              key={index}
              backgroundColor={colorTagList[item.value]?.backgroundColor}
              color={colorTagList[item.value]?.color}
            ></ContentChip>
          ));
        }}
      />
    </StyledInputContainer>
  );
}

export default TagInput;

const StyledLabel2 = styled(StyledLabel)`
  margin-bottom: 5px;
`;
