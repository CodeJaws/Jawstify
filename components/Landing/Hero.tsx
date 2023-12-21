import Image from 'next/image';
import styled from 'styled-components';
import HeroImg from '@/public/assets/images/landing1.png';
import { COLORS } from '@/styles/palettes';
import { fontStyle } from '@/styles/fontStyle';
import { onTablet, onPc } from '@/styles/mediaQuery';

function HeroSection() {
  return (
    <StyledHeroContainer>
      <StyledHeroImageWrapper>
        <Image fill src={HeroImg} alt="랜딩페이지" />
      </StyledHeroImageWrapper>
      <StyledHeroTextWrapper>
        <StyledHeroText1>새로운 일정 관리</StyledHeroText1>
        <StyledHeroText2>Taskify</StyledHeroText2>
      </StyledHeroTextWrapper>
      <StyledHeroDescription>서비스의 메인 설명 들어갑니다</StyledHeroDescription>
    </StyledHeroContainer>
  );
}

export default HeroSection

const StyledHeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 42px;

  ${onPc} {
    padding: 94px 0;
  }
`;

const StyledHeroImageWrapper = styled.div`
  position: relative;
  width: 287px;
  height: 168px;
  margin-bottom: 26px;

  ${onTablet} {
    width: 537px;
    height: 315px;
  }

  ${onPc} {
    width: 722px;
    height: 423px;
  }
`;
const StyledHeroTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  ${onTablet} {
    flex-direction: row;
    gap: 24px;
  }

  ${onPc} {
    flex-direction: row;
    gap: 28px;
  }
`;

const StyledHeroText1 = styled.h1`
  color: ${COLORS.BLACK_17};
  letter-spacing: -2px;
  ${fontStyle(40, 700)};

  ${onTablet} {
    ${fontStyle(56, 700)}
  }

  ${onPc} {
    ${fontStyle(76, 700)};
  }
`;

const StyledHeroText2 = styled.h1`
  color: ${COLORS.VIOLET_55};
  font-family: Montserrat;
  letter-spacing: -1px;
  ${fontStyle(42, 700)};

  ${onTablet} {
    ${fontStyle(70, 700)};
  }

  ${onPc} {
    ${fontStyle(90, 700)};
  }
`;

const StyledHeroDescription = styled.p`
  margin: 18px 0 70px;
  text-align: center;
  letter-spacing: -1px;
  ${fontStyle(12, 400)};

  ${onTablet} {
    ${fontStyle(16, 400)};
    margin: 24px 0 66px;
  }

  ${onPc} {
    margin: 24px 0 66px;
    ${fontStyle(18, 400)};
  }
`;
