import StatusChip from '@/components/Chip/StatusChip';
import Check from '@/public/assets/icons/GrayCheck.svg';
import { COLORS } from '@/styles/palettes';

import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
import { styled } from 'styled-components';

interface DropDownMenuProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setStatus: Dispatch<SetStateAction<string>>;
}

const PROGRESS_STATUS = [
  { id: 0, content: 'To Do' },
  { id: 1, content: 'On Progress' },
  { id: 2, content: 'Done' },
];

function DropDownMenu({ isOpen, setIsOpen, setStatus }: DropDownMenuProps) {
  const [isCheck, setIsCheck] = useState(0);

  const handleCheck = (id: number, content: string) => {
    setIsCheck(id);
    setStatus(content);
    setIsOpen((prev) => !prev);
  };

  return (
    <StyledContainer isOpen={isOpen}>
      <StyledWrapper>
        <StyledInWrapper>
          {PROGRESS_STATUS.map((val) => (
            <StyledButton key={val.id} onMouseDown={() => handleCheck(val.id, val.content)}>
              {isCheck === val.id ? <Image width={22} height={22} src={Check} alt="체크 이미지" /> : <StyledBlank />}
              <StatusChip content={val.content} />
            </StyledButton>
          ))}
        </StyledInWrapper>
      </StyledWrapper>
    </StyledContainer>
  );
}

export default DropDownMenu;

const StyledContainer = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: absolute;
  top: 50px;
  left: 0;
  width: 217px;
  height: 118px;
  border: 1px solid ${COLORS.GRAY_D9};
  border-radius: 6px;
  background: ${COLORS.WHITE_FF};
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.08);
  padding: 13px 8px;
`;

const StyledWrapper = styled.div`
  display: flex;
  gap: 6px;
`;

const StyledInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
`;

const StyledButton = styled.button`
  display: flex;
  gap: 6px;
`;

const StyledBlank = styled.div`
  width: 22px;
  height: 22px;
`;
