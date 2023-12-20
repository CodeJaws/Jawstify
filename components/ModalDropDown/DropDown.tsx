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

  const openMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleBlur = () => {
    setIsOpen(false);
  };

  return (
    <StyledContainer $isPressed={isOpen} onBlur={handleBlur}>
      <StyledWrapper>
        <StatusChip content={status} />
        <button onClick={openMenu}>
          <Image width={26} height={26} src={Arrow} alt="드롭다운 화살표" />
        </button>
      </StyledWrapper>
      <DropDownMenu isOpen={isOpen} setIsOpen={setIsOpen} setStatus={setStatus} />
    </StyledContainer>
  );
}

export default DropDown;

const StyledContainer = styled.div<{ $isPressed: boolean }>`
  position: relative;
  width: 217px;
  height: 48px;
  border: 1px solid ${({ $isPressed }) => ($isPressed ? COLORS.VIOLET_55 : COLORS.GRAY_D9)};
  border-radius: 6px;
  background: ${COLORS.WHITE_FF};
  padding: 0 10px;
`;

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
