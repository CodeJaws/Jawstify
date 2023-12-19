import StatusChip from '@/components/Chip/StatusChip';
import DropDownMenu from '@/components/ModalDropDown/DropDownMenu';
import { TO_DO } from '@/constants/Chip';
import Arrow from '@/public/assets/icons/ArrowDropdown.svg';
import { COLORS } from '@/styles/palettes';

import Image from 'next/image';
import { useState } from 'react';
import { styled } from 'styled-components';

function DropDown() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(TO_DO);

  const handleButton = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <StyledContainer isPressed={isOpen}>
      <StyledWrapper>
        <StatusChip content={status} />
        <button onClick={handleButton}>
          <Image src={Arrow} alt="드롭다운 화살표" />
        </button>
      </StyledWrapper>
      <DropDownMenu isOpen={isOpen} setStatus={setStatus} />
    </StyledContainer>
  );
}

export default DropDown;

const StyledContainer = styled.div<{ isPressed: boolean }>`
  position: relative;
  width: 217px;
  height: 48px;
  border: 1px solid ${({ isPressed }) => (isPressed ? COLORS.VIOLET : COLORS.GRAY_30)};
  border-radius: 6px;
  background: ${COLORS.WHITE};
  padding: 0 10px;
`;

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
