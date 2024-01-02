import StatusChip from '@/components/Chip/StatusChip';
import DropDownMenu from '@/components/ModalDropDown/DropDownMenu';
import Arrow from '@/public/assets/icons/ArrowDropdown.svg';
import { COLORS } from '@/styles/palettes';
import { ModalDropdownProps } from '@/types/dropdown';

import { Emoji } from '@/constants/ModalInput';
import useGetMember from '@/hooks/DropDown/useGetMember';
import useImgSrc from '@/hooks/DropDown/useImgSrc';
import useInputData from '@/hooks/DropDown/useInputData';
import useSelectStatus from '@/hooks/DropDown/useSelectStatus';
import useCardData from '@/hooks/ModalCard/useCardData';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import { css, styled } from 'styled-components';

function DropDown({ type, onChange }: ModalDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { status } = useSelectStatus();
  const { inputData, setInputData } = useInputData();
  const { imgSrc, setImgSrc } = useImgSrc();
  const { members } = useGetMember();
  const { cardData } = useCardData();

  const openMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const openDropDown = (e: ChangeEvent<HTMLInputElement>) => {
    setInputData(e.currentTarget.value);
    if (inputData) {
      setImgSrc('');
    }
    setIsOpen(true);
  };

  const handleBlur = () => {
    setIsOpen(false);
  };

  const filterData = members.members.filter((manager) => {
    if (inputData) {
      return manager.nickname.toLowerCase().includes(inputData.toLowerCase());
    }
  });

  useEffect(() => {
    onChange('상태', status);
  }, [status]);

  useEffect(() => {
    onChange('담당자', inputData);
  }, [inputData]);

  useEffect(() => {
    setInputData(cardData.assignee.nickname);

    setImgSrc(cardData.assignee.profileImageUrl);
  }, [setInputData, setImgSrc]);

  return (
    <>
      {type === 'status' ? (
        <StyledContainer $isPressed={isOpen} onBlur={handleBlur}>
          <StyledWrapper>
            <StatusChip content={status} />
            <button onClick={openMenu}>
              <Image width={26} height={26} src={Arrow} alt="드롭다운 화살표" />
            </button>
          </StyledWrapper>
          <DropDownMenu type={type} isOpen={isOpen} setIsOpen={setIsOpen} />
        </StyledContainer>
      ) : (
        <StyledInputWrapper>
          <StyledInput
            value={inputData}
            onChange={openDropDown}
            placeholder="이름을 입력해주세요"
            $imgSrc={imgSrc ?? Emoji}
          />
          {filterData.length !== 0 && (
            <>
              <button onClick={openMenu}>
                <StyledImage width={26} height={26} src={Arrow} alt="드롭다운 화살표" />
              </button>
              <DropDownMenu type={type} isOpen={isOpen} filterData={filterData} setIsOpen={setIsOpen} />
            </>
          )}
        </StyledInputWrapper>
      )}
    </>
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

const StyledInputWrapper = styled.div`
  position: relative;
  width: 217px;
  height: 48px;
`;
const StyledInput = styled.input<{ $imgSrc: any }>`
  width: 217px;
  height: 48px;
  border: 1px solid ${COLORS.GRAY_D9};
  border-radius: 6px;
  background: ${COLORS.WHITE_FF};
  padding: 0 10px;

  ${({ $imgSrc }) =>
    $imgSrc &&
    css`
      background-image: url(${$imgSrc});
      background-position: 5px;
      background-repeat: no-repeat;
      background-size: 27px;
      padding-left: 40px;
    `}

  &:focus {
    border-color: ${COLORS.VIOLET_55};
  }
`;

const StyledImage = styled(Image)`
  position: absolute;
  right: 16px;
  top: 10px;
`;
