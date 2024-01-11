import StatusChip from '@/components/Chip/StatusChip';
import DropDownMenu from '@/components/ModalDropDown/DropDownMenu';
import { DefaultImg } from '@/constants/ModalInput';
import useDropDown from '@/hooks/DropDown/useDropDown';
import Arrow from '@/public/assets/icons/ArrowDropdown.svg';
import { COLORS } from '@/styles/palettes';
import { ModalDropdownProps } from '@/types/dropdown';

import Image from 'next/image';
import { css, styled } from 'styled-components';

function DropDown({ type, onChange }: ModalDropdownProps) {
  const { filterData, handleBlur, imgSrc, inputData, isOpen, openDropDown, openMenu, setIsOpen, status } = useDropDown({
    onChange,
  });

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
        <StyledInputWrapper onBlur={handleBlur}>
          <StyledInput
            value={inputData}
            onClick={() => setIsOpen(true)}
            onChange={openDropDown}
            placeholder="이름을 입력해주세요"
            $imgSrc={imgSrc ?? DefaultImg}
          />
          {filterData?.length !== 0 && (
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
  background: var(--input--bg);
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
  border: 1px solid var(--input-border);
  border-radius: 6px;
  background: var(--input-bg);
  padding: 0 10px;
  color: var(--content-main);

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
