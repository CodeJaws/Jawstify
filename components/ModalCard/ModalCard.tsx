import DefaultImg from '@/public/assets/images/jaws.png';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import Image from 'next/image';
import { styled } from 'styled-components';
import ContentChip from '../Chip/ContentChip';
import StatusChip from '../Chip/StatusChip';

import useModalCard from '@/hooks/ModalCard/useModalCard';
import Comment from './Comment';
import Manager from './Manager';
import ModalButton from './ModalButton';

function ModalCard() {
  const { cardData, description, deviceType, imageUrl, title, status } = useModalCard();

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
          <StyledContent>
            {description.split('\n').map((val) => {
              return (
                <div key={val}>
                  {val}
                  <br />
                </div>
              );
            })}
          </StyledContent>
          {imageUrl && <StyledImage width={450} height={262} src={imageUrl} alt="카드 이미지" />}
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
  position: fixed;
  display: flex;
  width: 730px;
  height: fit-content;
  justify-content: space-between;
  gap: 24px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  background-color: var(--content-color);
  border: var(--content-border);
  border-radius: 10px;
  box-shadow: 0 2pc 12px 0px rgba(0, 0, 0, 0.08);
  padding: 32px 28px;

  ${onTablet} {
    width: 680px;
    max-height: 770px;
  }

  ${onMobile} {
    display: block;
    width: 327px;
    max-height: 708px;
    padding: 25px 15px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 2px;
    }
    &::-webkit-scrollbar-thumb {
      height: 30%;
      border-radius: 10px;
      background: ${COLORS.GRAY_D9};
    }
    &::-webkit-scrollbar-button:vertical:start:decrement,
    &::-webkit-scrollbar-button:vertical:start:increment {
      height: 25px;
    }
  }
`;

const StyledLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  ${onTablet} {
    min-width: 250px;
  }
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
  ${onMobile} {
    margin-top: 7px;
    gap: 16px;
  }
`;

const StyledTag = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  gap: 16px;
`;

const StyledContent = styled.div`
  ${fontStyle(14, 400)}
  line-height: 24px;
  word-break: break-all;

  ${onMobile} {
    font-size: 1.2rem;
    line-height: 22px;
  }
`;

const StyledImage = styled(Image)`
  object-fit: contain;
  ${onTablet} {
    width: 420px;
    height: 245px;
    margin: 0 auto;
  }
  ${onMobile} {
    width: 287px;
    height: 168px;
  }
`;

const StyledDivision = styled.div`
  height: 22px;
  border: 1px solid ${COLORS.GRAY_D9};
  ${onMobile} {
    height: 20px;
  }
`;

const StyledColorChipWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 5px;
`;

const StyledRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
