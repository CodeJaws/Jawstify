import Add from '@/public/assets/icons/Add.svg';
import { onMobile } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';

import Image from 'next/image';
import { styled } from 'styled-components';

function AddChip() {
  return (
    <StyledContainer>
      <StyledImage width={16} height={16} src={Add} alt="추가 버튼" />
    </StyledContainer>
  );
}

export default AddChip;

const StyledContainer = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;
  padding: 3px;
  border-radius: 4px;
  background-color: ${COLORS.VIOLET_F1};

  ${onMobile} {
    width: 20px;
    height: 20px;
  }
`;

const StyledImage = styled(Image)`
  ${onMobile} {
    width: 16px;
    height: 14px;
  }
`;
