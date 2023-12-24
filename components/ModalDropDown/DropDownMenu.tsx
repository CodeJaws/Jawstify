import StatusChip from '@/components/Chip/StatusChip';
import { PROGRESS_STATUS } from '@/constants/Chip';
import Check from '@/public/assets/icons/GrayCheck.svg';
import { COLORS } from '@/styles/palettes';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
import { styled } from 'styled-components';

interface FilterDataProps {
  id: number;
  imgSrc: string;
  name: string;
}

interface DropDownMenuProps {
  type: string;
  isOpen: boolean;
  filterData?: FilterDataProps[];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setStatus?: Dispatch<SetStateAction<string | undefined>>;
  setInputData?: Dispatch<SetStateAction<string | undefined>>;
  setImgSrc?: Dispatch<SetStateAction<string | undefined>>;
}

function DropDownMenu({
  type,
  isOpen,
  filterData = [],
  setIsOpen,
  setStatus,
  setInputData,
  setImgSrc,
}: DropDownMenuProps) {
  const [isCheck, setIsCheck] = useState(0);

  const handleCheck = (id: number, content: string, imgSrc?: string) => {
    setIsCheck(id);
    setIsOpen((prev) => !prev);

    if (setStatus) {
      setStatus(content);
    }
    if (setInputData && setImgSrc) {
      setInputData(content);
      setImgSrc(imgSrc);
    }
  };

  return (
    <StyledContainer $isOpen={isOpen}>
      <StyledWrapper>
        {type === 'status' ? (
          <StyledInWrapper>
            {PROGRESS_STATUS.map((val, index) => (
              <StyledButton key={val.id} onMouseDown={() => handleCheck(index, val.content)}>
                {isCheck === index ? <Image width={22} height={22} src={Check} alt="체크 이미지" /> : <StyledBlank />}
                <StatusChip content={val.content} />
              </StyledButton>
            ))}
          </StyledInWrapper>
        ) : (
          <StyledInWrapper>
            {filterData.map((val, index) => (
              <StyledButton key={val.id} onMouseDown={() => handleCheck(index, val.name, val.imgSrc)}>
                {isCheck === index ? <Image width={22} height={22} src={Check} alt="체크 이미지" /> : <StyledBlank />}
                <StyledMangerList>
                  <Image width={26} height={26} src={val.imgSrc} alt="담당자 이미지" />
                  {val.name}
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
  border: 1px solid ${COLORS.GRAY_D9};
  border-radius: 6px;
  background: ${COLORS.WHITE_FF};
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.08);
  padding: 13px 8px;
  z-index: 3;
`;

const StyledWrapper = styled.div`
  display: flex;
  gap: 6px;
`;

const StyledInWrapper = styled.div`
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
`;
