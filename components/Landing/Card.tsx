import Image, { StaticImageData } from 'next/image';
import styled, { css } from 'styled-components';
import cardImg1 from '@/public/assets/images/landing4.png';
import cardImg2 from '@/public/assets/images/landing5.png';
import cardImg3 from '@/public/assets/images/landing6.png';
import { COLORS } from '@/styles/palettes';
import { fontStyle } from '@/styles/fontStyle';
import { onTablet, onPc } from '@/styles/mediaQuery';

interface CardContainerProps {
  cardImg: StaticImageData;
  imgAlt: string;
  text1: string;
  text2: string;
  type: 'first' | 'second' | 'third';
}

function CardSection() {
  return (
    <StyledCardSectionContainer>
      <StyledCardSectionTitle>생산성을 높이는 다양한 설정 ⚡</StyledCardSectionTitle>
      <StyledCardSectionWrapper>
        <CardContainer
          cardImg={cardImg1}
          imgAlt="대시보드 설정"
          text1="대시보드 설정"
          text2="대시보드 사진과 이름을 변경할 수 있어요."
          type="first"
        />
        <CardContainer
          cardImg={cardImg2}
          imgAlt="대시보드 설정"
          text1="초대"
          text2="새로운 팀원을 초대할 수 있어요."
          type="second"
        />
        <CardContainer
          cardImg={cardImg3}
          imgAlt="대시보드 설정"
          text1="구성원"
          text2="구성원을 초대하고 내보낼 수 있어요."
          type="third"
        />
      </StyledCardSectionWrapper>
    </StyledCardSectionContainer>
  );
}

export default CardSection;

const StyledCardSectionContainer = styled.div`
  margin: 90px 0;
`;

const StyledCardSectionTitle = styled.h2`
  color: ${COLORS.BLACK_17};
  font-feature-settings:
    'clig' off,
    'liga' off;
  ${fontStyle(22, 700)};
  text-align: center;
  margin-bottom: 36px;

  ${onTablet} {
    margin-bottom: 36px;
    ${fontStyle(28, 700)};
  }

  ${onPc} {
    margin-bottom: 36px;
    ${fontStyle(28, 700)};
  }
`;

const StyledCardSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;

  ${onTablet} {
    gap: 48px;
  }

  ${onPc} {
    flex-direction: row;
    justify-content: center;
    gap: 33px;
  }
`;

const CardContainer = ({ cardImg, imgAlt, text1, text2, type }: CardContainerProps) => {
  return (
    <StyledCardContainer>
      <StyledCardImageContainer>
        <StyledCardImageWrapper $type={type}>
          <Image fill src={cardImg} alt={imgAlt} />
        </StyledCardImageWrapper>
      </StyledCardImageContainer>
      <StyledCardTextContainer>
        <StyledCardText1>{text1}</StyledCardText1>
        <StyledCardText2>{text2}</StyledCardText2>
      </StyledCardTextContainer>
    </StyledCardContainer>
  );
};

const StyledCardContainer = styled.div`
  width: 343px;
  height: 100%;

  ${onTablet} {
    width: 378px;
    height: 384px;
  }

  ${onPc} {
    width: 378px;
    height: 384px;
  }
`;

const StyledCardImageContainer = styled.div`
  width: 100%;
  height: 236px;
  background-color: ${COLORS.VIOLET_F1};
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;

  ${onTablet} {
    height: 260px;
  }

  ${onPc} {
    height: 260px;
  }
`;

const StyledCardImageWrapper = styled.div<{ $type: string }>`
  position: relative;

  ${({ $type }) => {
    switch ($type) {
      case 'first':
        return css`
          width: 303px;
          height: 125px;

          ${onTablet} {
            width: 320px;
            height: 132px;
          }

          ${onPc} {
            width: 320px;
            height: 132px;
          }
        `;
      case 'second':
        return css`
          width: 303px;
          height: 165px;

          ${onTablet} {
            width: 320px;
            height: 174px;
          }

          ${onPc} {
            width: 323px;
            height: 176px;
          }
        `;
      case 'third':
        return css`
          width: 303px;
          height: 197px;

          ${onTablet} {
            width: 320px;
            height: 209px;
          }

          ${onPc} {
            width: 323px;
            height: 210px;
          }
        `;
      default:
        return css`
          width: 303px;
          height: 133px;
        `;
    }
  }}
`;

const StyledCardTextContainer = styled.div`
  width: 100%;
  height: 113px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 27px 32px;
  background-color: #1501cb9c;
  color: ${COLORS.WHITE_FF};
  border-radius: 0 0 8px 8px;

  ${onTablet} {
    height: 124px;
  }
`;

const StyledCardText1 = styled.p`
  ${fontStyle(18, 700)};
`;

const StyledCardText2 = styled.p`
  ${fontStyle(16, 500)};
`;