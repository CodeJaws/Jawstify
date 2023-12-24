import styled from 'styled-components';
import Image from 'next/image';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onPc, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import calendar from '@/public/assets/icons/calendar.svg';
import ContentChip from '../Chip/ContentChip';

function Card() {
  return (
    <StyledContainer>
      <StyledImageContainer>

      </StyledImageContainer>
      <StyledInfoContainer>
        <StyledInfoTitle>새로운 일정 관리 Taskify</StyledInfoTitle>
        <StyledInfoWrapper>
          <StyledInfoChips>
            <ContentChip text='백엔드' color='red' backgroundColor='pink' />
            <ContentChip text='상' color='green' backgroundColor='yellowgreen' />
          </StyledInfoChips>
          <StyledInfoDate>
            <StyledCalendarIconContainer>
              <Image src={calendar} fill alt='캘린더 아이콘' />
            </StyledCalendarIconContainer>
            2023.12.25
          </StyledInfoDate>
        </StyledInfoWrapper>
      </StyledInfoContainer>
      <StyledInfoProfile>B</StyledInfoProfile>
    </StyledContainer>
  );
}

export default Card;

const StyledContainer = styled.div`
  width: 284px;
  height: 257px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  border-radius: 6px;
  border: 1px solid ${COLORS.GRAY_D9};
  background: ${COLORS.WHITE_FF};
  position: relative;

  ${onTablet} {
    width: 544px;
    height: 96px;
    padding: 20px;
    flex-direction: row;
    align-items: flex-start;
    gap: 20px;
  }

  ${onPc} {
    width: 314px;
    height: 297px;
    padding: 20px;
    gap: 12px;
  }
`;

const StyledImageContainer = styled.div`
  border: 1px solid #000;
  width: 100%;
  height: 100%;

  ${onTablet} {
    width: 90px;
  }
`;

const StyledInfoContainer = styled.div`
  width: 100%;
  height: auto;

  ${onTablet} {
    height: 100%;
  }
`;

const StyledInfoTitle = styled.div`
  color: ${COLORS.BLACK_33}; 
  ${fontStyle(16, 500)};
  margin-bottom: 10px;

  ${onMobile} {
    ${fontStyle(14, 500)};
    margin-bottom: 6px;
  }
`;

const StyledInfoWrapper = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  grid-row-gap: 6px;
  grid-template-areas: 
    'chips'
    'date';

  ${onTablet} {
    grid-template-areas: 
    'chips date';
    justify-content: flex-start;
    grid-column-gap: 16px;
  }
`;

const StyledInfoChips = styled.div`
  grid-area: chips;
  display: flex;
  justify-content: flex-start;
  gap: 6px;
`;

const StyledInfoDate = styled.div`
  display: flex;
  gap: 6px;
  justify-content: flex-start;
  align-items: center;
  grid-area: date;
  ${fontStyle(12, 500)};
  color: ${COLORS.GRAY_78};
  
  ${onMobile} {
    gap: 4px;
    ${fontStyle(10, 500)};
  }
`;

const StyledInfoProfile = styled.span`
  grid-area: profile;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 20px;
  right: 20px;
  ${fontStyle(12, 600)};


  ${onMobile} {
    width: 22px;
    height: 22px;
    bottom: 12px;
    right: 12px;
  }
`;

const StyledCalendarIconContainer = styled.div`
  position: relative;
  width: 18px;
  height: 18px;

  ${onMobile} {
    width: 14px;
    height: 14px;
  }
`;
