import DropDown from '@/components/ModalDropDown/DropDown';
import Green from '@/public/assets/icons/GreenEllipse.svg';
import Pink from '@/public/assets/icons/PinkEllipse.svg';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import { ModalDropdownProps } from '@/types/dropdown';

import { styled } from 'styled-components';

export const MANGER_LIST = [
  { id: 0, imgSrc: Green, name: '배유철' },
  { id: 1, imgSrc: Pink, name: '배동석' },
  { id: 2, imgSrc: Green, name: '임동석' },
  { id: 3, imgSrc: Pink, name: '임냥냥' },
  { id: 4, imgSrc: Green, name: '김동석' },
  { id: 5, imgSrc: Pink, name: '김멍멍' },
];

function ModalDropDown({ type }: ModalDropdownProps) {
  return (
    <StyledContainer>
      <StyledLabel>{type === 'status' ? '상태' : '담당자'}</StyledLabel>
      <DropDown type={type} />
    </StyledContainer>
  );
}

export default ModalDropDown;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledLabel = styled.label`
  ${fontStyle(18, 500)}
  color: ${COLORS.BLACK_33};

  ${onMobile} {
    ${fontStyle(16, 500)}
  }
`;
