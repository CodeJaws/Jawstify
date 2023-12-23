import { fontStyle } from '@/styles/fontStyle';
import { COLORS } from '@/styles/palettes';

import useDeviceType from '@/hooks/useDeviceType';
import { ModalContext } from '@/pages/modalcard';
import { onMobile } from '@/styles/mediaQuery';
import Image from 'next/image';
import { useContext } from 'react';
import { styled } from 'styled-components';
import ContentChip from '../Chip/ContentChip';
import Comment from './Comment';
import Manager from './Manager';
import ModalButton from './ModalButton';

function ModalCard() {
  const { title, content, status, tag, cardImg } = useContext(ModalContext);
  const deviceType = useDeviceType();
  return (
    <StyledContainer>
      <StyledLeftContainer>
        {deviceType === 'mobile' && <ModalButton />}
        <StyledTitleWrapper>
          <StyledTitle>{title}</StyledTitle>
          {deviceType === 'mobile' && <Manager />}
          <StyledTag>
            {status}
            <StyledDivision />
            <StyledColorChipWrapper>
              {tag.map((val) => (
                <ContentChip key={val.id} text={val.text} color={val.color} backgroundColor={val.backgroundColor} />
              ))}
            </StyledColorChipWrapper>
          </StyledTag>
        </StyledTitleWrapper>
        <StyledContentWrapper>
          <StyledContent>{content}</StyledContent>
          <StyledImage width={450} height={262} src={cardImg} alt="카드 이미지" />
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
