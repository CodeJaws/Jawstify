import useSelectStatus from '@/hooks/DropDown/useSelectStatus';
import useCardData from '@/hooks/ModalCard/useCardData';
import useDashBoard from '@/hooks/ModalCard/useDashBoard';
import useDeviceType from '@/hooks/useDeviceType';
import Emoji from '@/public/assets/images/emoji.webp';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import Image from 'next/image';
import { useEffect } from 'react';
import { styled } from 'styled-components';
import ContentChip from '../Chip/ContentChip';
import StatusChip from '../Chip/StatusChip';
import Comment from './Comment';
import Manager from './Manager';
import ModalButton from './ModalButton';

function ModalCard() {
  const { cardData } = useCardData();
  const { setStatus } = useSelectStatus();

  const { tasks } = useDashBoard();
  const { title, description, imageUrl } = cardData;

  const deviceType = useDeviceType();

  const filterColumn = tasks.data.filter((val) => val.id === cardData.columnId);
  const status = filterColumn[0].title;

  useEffect(() => {
    setStatus(status);
  }, [setStatus, status]);

  return (
    <StyledContainer>
      <StyledLeftContainer>
        {deviceType === 'mobile' && <ModalButton />}
        <StyledTitleWrapper>
          <StyledTitle>{title}</StyledTitle>
          {deviceType === 'mobile' && <Manager />}
          <StyledTag>
            <StatusChip content={status} />
            <StyledDivision />
            <StyledColorChipWrapper>
              {cardData.tags.map((val) => (
                <ContentChip
                  key={val}
                  text={val.substring(0, val.indexOf('/'))}
                  color={val.substring(val.indexOf('/') + 1, val.indexOf('/', val.indexOf('/') + 1))}
                  backgroundColor={val.substring(val.lastIndexOf('/') + 1)}
                />
              ))}
            </StyledColorChipWrapper>
          </StyledTag>
        </StyledTitleWrapper>
        <StyledContentWrapper>
          <StyledContent>{description}</StyledContent>
          {imageUrl ? (
            <StyledImage width={450} height={262} src={imageUrl} alt="카드 이미지" />
          ) : (
            <StyledImage width={450} height={262} src={Emoji} alt="카드 기본 이미지" />
          )}
        </StyledContentWrapper>
        <Comment />
      </StyledLeftContainer>
      {deviceType !== 'mobile' && (
        <StyledRightContainer>
          <ModalButton />
          <Manager />
        </StyledRightContainer>
      )}
    </StyledContainer>
  );
}

export default ModalCard;

const StyledContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  gap: 24px;
  width: 730px;
  height: auto;
  padding: 32px 28px;
  background-color: ${COLORS.WHITE_FF};

  ${onMobile} {
    display: block;
    width: 327px;
    height: 708px;
    padding: 12px;
  }
`;

const StyledLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled.p`
  ${fontStyle(24, 700)}
  ${onMobile} {
    font-size: 2rem;
  }
`;

const StyledTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledTag = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  gap: 16px;
`;

const StyledContent = styled.p`
  ${fontStyle(14, 400)}
  line-height: 24px;
  word-break: break-all;

  ${onMobile} {
    font-size: 1.2rem;
    line-height: 22px;
  }
`;

const StyledImage = styled(Image)`
  ${onMobile} {
    width: 287px;
    height: 168px;
    margin: 0 auto;
  }
`;

const StyledDivision = styled.div`
  height: 20px;
  border: 1px solid ${COLORS.GRAY_D9};
`;

const StyledColorChipWrapper = styled.div`
  display: flex;
`;

const StyledRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
