import DropDown from '@/components/ModalDropDown/DropDown';
import { fontStyle } from '@/styles/fontStyle';
import { COLORS } from '@/styles/palettes';

import { styled } from 'styled-components';

function ModalDropDown() {
  return (
    <StyledContainer>
      <StyledLabel>상태</StyledLabel>
      <DropDown />
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
  color: ${COLORS.BLACK_200};
`;
