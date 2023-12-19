import Image from 'next/image';
import styled from 'styled-components';
import { onTablet, onMobile } from '@/styles/mediaQuery';
import plus from '@/public/assets/icons/plus.svg';
import { COLORS } from '@/styles/palettes';

function AddButton() {
  return (
    <>
      <StyledButton>
        <StyledPlusImage src={plus} alt="Plus이미지" />
      </StyledButton>
    </>
  );
}

export default AddButton;

const StyledButton = styled.button`
  width: 314px;
  height: 40px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  border: 1px solid ${COLORS.GRAY_D9};
  background: ${COLORS.WHITE_FF};
  ${onTablet} {
    width: 544px;
  }
  ${onMobile} {
    width: 284px;
    height: 32px;
  }
`;

const StyledPlusImage = styled(Image)`
  width: 16px;
  height: 16px;

  ${onMobile} {
    width: 14.5px;
    height: 14.5px;
  }
`;
