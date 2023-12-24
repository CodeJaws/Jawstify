import Image from 'next/image';
import styled from 'styled-components';
import setting from '@/public/assets/icons/setting.svg';
import { onMobile, onTablet, onPc } from '@/styles/mediaQuery';
import CountChip from '../Chip/CountChip';
import { fontStyle } from '@/styles/fontStyle';
import AddButton from '../common/Button/AddButton';
import Card from './Card';
import { COLORS } from '@/styles/palettes';

interface ColumnProps {
  title: string;
}

function Column({ title }: ColumnProps) {
  const handleClick = () => {

  }

  return (
    <StyledContainer>
      <StyledSettingIconContainer>
        <Image fill src={setting} alt='설정' />
      </StyledSettingIconContainer>
      <StyledHeader>
        <div>{title}</div>
        <StyledCountChip content='2' />
      </StyledHeader>
      <StyledWrapper>
        <AddButton onClick={handleClick}/>
        <Card />
      </StyledWrapper>
    </StyledContainer>
  );
}

export default Column;

const StyledContainer = styled.div`
  width: 308px;
  height: auto;
  padding: 12px;
  position: relative;
  border-bottom: 1px solid ${COLORS.GRAY_EE};

  ${onTablet} {
    width: 584px;
    padding: 20px;
  }

  ${onPc} {
    width: 354px;
    padding: 20px;
    border: none;
    border-right: 1px solid ${COLORS.GRAY_EE};
  }
`

const StyledSettingIconContainer = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  right: 20px;
  top: 20px;
  
  ${onMobile} {
    width: 22px; 
    height: 22px;
    right: 12px;
    top: 12px;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  gap: 12px;
  ${fontStyle(18, 700)};
  margin-bottom: 25px;

  ${onMobile} {
    ${fontStyle(16, 700)};
    margin-bottom: 17px;
  }
`;

const StyledCountChip = styled(CountChip)`
  width: 20px;
  height: 20px;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  ${onMobile} {
    gap: 10px;
  }
`;
