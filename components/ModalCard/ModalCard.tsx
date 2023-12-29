import { fontStyle } from '@/styles/fontStyle';
import { COLORS } from '@/styles/palettes';

import useCardData from '@/hooks/ModalCard/useCardData';
import useDeviceType from '@/hooks/useDeviceType';
import Crown from '@/public/assets/images/emoji.webp';
import { onMobile } from '@/styles/mediaQuery';
import Image from 'next/image';
import { styled } from 'styled-components';
import ContentChip from '../Chip/ContentChip';
import Comment from './Comment';
import Manager from './Manager';
import ModalButton from './ModalButton';

function ModalCard() {
  const { cardData } = useCardData();
  const { title, description } = cardData;
  const deviceType = useDeviceType();

  return (
    <StyledContainer>
      <StyledLeftContainer>
        {deviceType === 'mobile' && <ModalButton />}
        <StyledTitleWrapper>
          <StyledTitle>{title}</StyledTitle>
          {deviceType === 'mobile' && <Manager />}
          <StyledTag>
            {/* {status} */}
            <StyledDivision />
            <StyledColorChipWrapper>
              {cardData.tags.map((val) => (
                <ContentChip key={val} text={val} color={'#fff'} backgroundColor={'#000'} />
              ))}
            </StyledColorChipWrapper>
          </StyledTag>
        </StyledTitleWrapper>
        <StyledContentWrapper>
          <StyledContent>{description}</StyledContent>
          <StyledImage width={450} height={262} src={Crown} alt="카드 이미지" />
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
  height: 763px;
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
  gap: 6px;
`;

const StyledRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
