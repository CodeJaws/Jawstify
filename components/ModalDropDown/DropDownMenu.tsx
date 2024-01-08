import StatusChip from '@/components/Chip/StatusChip';
import useDropDown from '@/hooks/DropDown/useDropDownMenu';
import Check from '@/public/assets/icons/GrayCheck.svg';
import DefaultImg from '@/public/assets/images/jaws.png';

import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { styled } from 'styled-components';

interface DropDownMenuProps {
  type: string;
  isOpen: boolean;
  filterData?: {
    id: number;
    nickname: string;
    profileImageUrl: string;
    userId: number;
  }[];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function DropDownMenu({ type, isOpen, filterData, setIsOpen }: DropDownMenuProps) {
  const { handleCheck, handleCheckName, isCheck, tasks } = useDropDown({ setIsOpen });

  return (
    <StyledContainer $isOpen={isOpen}>
      <StyledWrapper>
        {type === 'status' ? (
          <StyledInWrapper>
            {tasks.data.map((val) => (
              <StyledButton key={val.id} onMouseDown={() => handleCheck(val.id, val.title)}>
                {isCheck === val.id ? <Image width={22} height={22} src={Check} alt="체크 이미지" /> : <StyledBlank />}
                <StatusChip content={val.title} />
              </StyledButton>
            ))}
          </StyledInWrapper>
        ) : (
          <StyledInWrapper>
            {filterData?.map((val) => (
              <StyledButton
                key={val.userId}
                onMouseDown={() => handleCheckName(val.userId, val.nickname, val.profileImageUrl)}
              >
                <StyledMangerList>
                  {val.profileImageUrl ? (
                    <Image width={26} height={26} src={val.profileImageUrl} alt="담당자 이미지" />
                  ) : (
                    <Image width={26} height={26} src={DefaultImg} alt="담당자 기본 이미지" />
                  )}
                  {val.nickname}
                </StyledMangerList>
              </StyledButton>
            ))}
          </StyledInWrapper>
        )}
      </StyledWrapper>
    </StyledContainer>
  );
}

export default DropDownMenu;

const StyledContainer = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  position: absolute;
  top: 50px;
  left: 0;
  width: 217px;
  height: auto;
  border-radius: 6px;
  border: 1px solid var(--input-border);
  background: var(--input-bg);
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.08);
  padding: 13px 8px;
  z-index: 10;
`;

const StyledWrapper = styled.div`
  display: flex;
  gap: 6px;
`;

const StyledInWrapper = styled.div`
  background: var(--input--bg);
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 13px;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0.5rem;
  width: 100%;

  &:hover {
    border-radius: 8px;
    background-color: rgba(0, 0, 0, 0.08);
  }
`;

const StyledBlank = styled.div`
  width: 22px;
  height: 22px;
`;

const StyledMangerList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  color: var(--content-main);
`;
