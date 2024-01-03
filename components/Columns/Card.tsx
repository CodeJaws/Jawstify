import useCardId from '@/hooks/ModalCard/useCardId';
import useCardOpen from '@/hooks/ModalCard/useCardOpen';
import useDashBoardId from '@/hooks/ModalCard/useDashBoardId';
import calendar from '@/public/assets/icons/calendar.svg';
import DefaultImg from '@/public/assets/images/jaws.png';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onPc, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import dateFormat from '@/utils/dateFormat';
import Image from 'next/image';
import styled from 'styled-components';
import ContentChip from '../Chip/ContentChip';

interface Props {
  cardInfoData: { dashboardId: number; cardId: number };
  title: string;
  // description: string;
  tags: string[];
  dueDate: string;
  assignee: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
  imageUrl: string;
}

function Card({ title, dueDate, imageUrl, tags, assignee: { profileImageUrl }, cardInfoData }: Props) {
  const { setCardId } = useCardId();
  const { setDashboardId } = useDashBoardId();
  const { setIsCardOpen } = useCardOpen();

  const handleCardDetailModalOpen = () => {
    setIsCardOpen(true);
    setCardId(cardInfoData.cardId);
    setDashboardId(cardInfoData.dashboardId);
  };

  const date = dueDate ? dateFormat(dueDate) : null;

  return (
    <StyledContainer onClick={handleCardDetailModalOpen}>
      {imageUrl ? (
        <StyledImageContainer>
          <Image
            src={imageUrl}
            width={1000}
            height={1000}
            style={{ width: 'auto', height: '100%' }}
            alt="카드 이미지"
          />{' '}
        </StyledImageContainer>
      ) : (
        <></>
      )}
      <StyledInfoContainer>
        <StyledInfoTitle>{title}</StyledInfoTitle>
        <StyledInfoWrapper>
          {tags.length > 0 && (
            <StyledInfoChips>
              {tags.map((val) => (
                <ContentChip
                  key={val}
                  text={val.substring(0, val.indexOf('/'))}
                  color={val.substring(val.indexOf('/') + 1, val.indexOf('/', val.indexOf('/') + 1))}
                  backgroundColor={val.substring(val.lastIndexOf('/') + 1)}
                />
              ))}
            </StyledInfoChips>
          )}

          <StyledInfoDate>
            {date && (
              <StyledCalendarIconContainer>
                <Image src={calendar} fill alt="캘린더 아이콘" />
              </StyledCalendarIconContainer>
            )}
            {date}
            <StyledInfoProfile>
              <Image src={profileImageUrl ?? DefaultImg} fill style={{ borderRadius: '50%' }} alt={'프로필'} />
            </StyledInfoProfile>
          </StyledInfoDate>
        </StyledInfoWrapper>
      </StyledInfoContainer>
    </StyledContainer>
  );
}

export default Card;

const StyledContainer = styled.div`
  width: 284px;
  height: auto;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  border-radius: 6px;
  border: 1px solid ${COLORS.GRAY_D9};
  background: ${COLORS.WHITE_FF};
  position: relative;
  cursor: pointer;

  ${onTablet} {
    width: 544px;
    padding: 20px;
    flex-direction: row;
    align-items: center;
    gap: 20px;
  }

  ${onPc} {
    width: 314px;

    padding: 20px;
    gap: 12px;
  }
`;

const StyledImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 160px;
  border-radius: 6px;

  ${onTablet} {
    width: 90px;
    height: 53px;
  }
`;

const StyledInfoContainer = styled.div`
  display: grid;
  width: 100%;
  height: auto;

  ${onTablet} {
    height: 100%;
  }
`;

const StyledInfoTitle = styled.div`
  color: ${COLORS.BLACK_33};
  ${fontStyle(16, 500)};
  margin-bottom: 6px;

  ${onMobile} {
    ${fontStyle(14, 500)};
  }
`;

const StyledInfoWrapper = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-areas:
    'chips'
    'date';

  ${onTablet} {
    justify-content: flex-start;
    grid-column-gap: 16px;
  }
`;

const StyledInfoChips = styled.div`
  grid-area: chips;
  display: block;
  justify-content: flex-start;
  gap: 6px;
  margin-bottom: 5px;
`;

const StyledInfoDate = styled.div`
  display: flex;
  gap: 6px;
  justify-content: flex-start;
  align-items: flex-end;
  grid-area: date;
  ${fontStyle(12, 500)};
  color: ${COLORS.GRAY_78};

  ${onMobile} {
    gap: 4px;
    ${fontStyle(10, 500)};
  }
`;

const StyledInfoProfile = styled.div`
  grid-area: profile;
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

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
