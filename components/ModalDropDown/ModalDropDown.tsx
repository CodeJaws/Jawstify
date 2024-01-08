import DropDown from '@/components/ModalDropDown/DropDown';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile } from '@/styles/mediaQuery';
import { ModalDropdownProps } from '@/types/dropdown';

import { styled } from 'styled-components';

function ModalDropDown({ type, onChange }: ModalDropdownProps) {
  return (
    <StyledContainer>
      <StyledLabel>{type === 'status' ? '상태' : '담당자'}</StyledLabel>
      <DropDown type={type} onChange={onChange} />
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
  color: var(--input-label);

  ${onMobile} {
    ${fontStyle(16, 500)}
  }
`;
