import Image from 'next/image'
import Nav from '@/components/Landing/Nav';
import styled from 'styled-components'
import HeroImg from '@/public/assets/images/landing1.png';
import pointImg1 from '@/public/assets/images/landing2.png';
import pointImg2 from '@/public/assets/images/landing3.png';
import cardImg1 from '@/public/assets/images/landing4.png';
import cardImg2 from '@/public/assets/images/landing5.png';
import cardImg3 from '@/public/assets/images/landing6.png';
import { COLORS } from '@/styles/palettes';
import { fontStyle } from '@/styles/fontStyle';
import { onTablet, onPc } from '@/styles/mediaQuery';
import Footer from '@/components/Landing/Footer';

function Landing() {

  return (
    <>
      <Nav />
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
      <PointSection />
      <CardSection />
      <Footer />
    </>
  )
}

export default Landing

// Hero
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
`
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
  color: ${COLORS.BLACK_300};
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
  color: ${COLORS.VIOLET};
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

const PointSection = () => {
  return (
    <StyledPointSectionContainer>
      <StyledPointSectionWrapper>
        <StyledPointTextContainer>
          <StyledPointText1>Point 1</StyledPointText1>
          <StyledPointText2>일의 우선순위를<br/> 관리하세요.</StyledPointText2>
        </StyledPointTextContainer>
        <StyledPointSectionImage1Wrapper>
          <Image src={pointImg1} fill alt='일의 우선순위를 관리하세요.'/>
        </StyledPointSectionImage1Wrapper>
      </StyledPointSectionWrapper>
      <StyledPointSectionWrapper>
        <StyledPointTextContainer2>
          <StyledPointText1>Point 2</StyledPointText1>
          <StyledPointText2>해야할 일을<br/> 등록하세요</StyledPointText2>
        </StyledPointTextContainer2>
        <StyledPointSectionImage2Wrapper>
          <Image src={pointImg2} fill alt='해야할 일을 등록하세요'/>
        </StyledPointSectionImage2Wrapper>
        </StyledPointSectionWrapper>
    </StyledPointSectionContainer>
  );
}

const StyledPointSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 59px;

  ${onTablet} {
    gap: 90px;
  }
`;

const StyledPointSectionWrapper = styled.div`
  width: 343px;
  height: 686px;
  position: relative;
  background-color: ${COLORS.VIOLET_LIGHT};
  border-radius: 8px;

  ${onTablet} {
    width: 664px;
    height: 972px;
  }

  ${onPc} {
    width: 1200px;
    height: 600px;
  }
`;

const StyledPointTextContainer = styled.div`
  display: grid;
  padding: 60px 58px;
  text-align: center;
  grid-template-areas: 
    'text1'
    'text2';

  ${onTablet} {
    text-align: start;
    padding: 63px 60px;
    grid-template-areas: 
      'text1 .'
      'text2 .';
  }

  ${onPc} {
    text-align: start;
    padding: 123px 60px;
    grid-template-areas: 
      'text1 .'
      'text2 .';
  }
`;

const StyledPointTextContainer2 = styled.div`
  display: grid;
  padding: 60px 58px;
  text-align: center;
  grid-template-areas: 
    'text1'
    'text2';

  ${onTablet} {
    text-align: start;
    padding: 63px 60px;
  }

  ${onPc} {
    text-align: end;
    padding: 123px 0px;
    grid-template-areas: 
      '. text1 .'
      '. text2 .';
  }
`;

const StyledPointText1 = styled.div`
  color: ${COLORS.BLACK_200};
  font-feature-settings: 'clig' off, 'liga' off;
  ${fontStyle(18, 500)};
  margin-bottom: 80px; 
  grid-area: text1;

  ${onTablet} {
    ${fontStyle(22, 500)};
    margin-bottom: 100px;
  }

  ${onPc} {
    ${fontStyle(22, 500)};
    margin-bottom: 100px;
  }
`;

const StyledPointText2 = styled.div`
  color: ${COLORS.BLACK_300};
  font-feature-settings: 'clig' off, 'liga' off;
  ${fontStyle(36, 700)};
  grid-area: text2;

  ${onTablet} {
    ${fontStyle(48, 700)};
  }

  ${onPc} {
    ${fontStyle(48, 700)};
  }
`;

const StyledPointSectionImage1Wrapper = styled.div`
  width: 296px;
  height: 248px;
  position: absolute;
  right: 0;
  bottom: 0;

  ${onTablet} {
    width: 519px;
    height: 435px;
  }

  ${onPc} {
    width: 594px;
    height: 497px;
  }
`;

const StyledPointSectionImage2Wrapper = styled.div`
  width: 217px;
  height: 250px;
  position: absolute;
  bottom: 0;
  left: 63px;

  ${onTablet} {
    width: 360px;
    height: 415px;
    left: 152px;
  }

  ${onPc} {
    width: 436px;
    height: 502px;
    left: 108px;
  }
`;

// Card
const CardSection = () => {
  return (
    <StyledCardSectionContainer>
      <StyledCardSectionTitle>생산성을 높이는 다양한 설정 ⚡</StyledCardSectionTitle>
      <StyledCardSectionWrapper>
        <StyledCardContainer>
          <StyledCardImageContainer>
            <StyledCardImage1Wrapper>
              <Image fill src={cardImg1} alt='대시보드 설정' />
            </StyledCardImage1Wrapper>
          </StyledCardImageContainer>
          <StyledCardTextContainer>
            <StyledCardText1>대시보드 설정</StyledCardText1>
            <StyledCardText2>대시보드 사진과 이름을 변경할 수 있어요.</StyledCardText2>
          </StyledCardTextContainer>
        </StyledCardContainer>
        <StyledCardContainer>
          <StyledCardImageContainer>
            <StyledCardImage2Wrapper>
              <Image fill src={cardImg2} alt='대시보드 설정' />
            </StyledCardImage2Wrapper>
          </StyledCardImageContainer>
          <StyledCardTextContainer>
            <StyledCardText1>초대</StyledCardText1>
            <StyledCardText2>새로운 팀원을 초대할 수 있어요.</StyledCardText2>
          </StyledCardTextContainer>
        </StyledCardContainer>
        <StyledCardContainer>
          <StyledCardImageContainer>
            <StyledCardImage3Wrapper>
              <Image fill src={cardImg3} alt='대시보드 설정' />
            </StyledCardImage3Wrapper>
          </StyledCardImageContainer>
          <StyledCardTextContainer>
            <StyledCardText1>구성원</StyledCardText1>
            <StyledCardText2>구성원을 초대하고 내보낼 수 있어요.</StyledCardText2>
          </StyledCardTextContainer>
        </StyledCardContainer>
      </StyledCardSectionWrapper>
    </StyledCardSectionContainer>
  )
};

const StyledCardSectionContainer = styled.div`
  margin: 90px 0;
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

const StyledCardSectionTitle = styled.h2`
  color: ${COLORS.BLACK_300};
  font-feature-settings: 'clig' off, 'liga' off;
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
  background-color: ${COLORS.VIOLET_LIGHT};
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

// const StyledCardImageWrapper = styled.div<{width: string; height: string;}>`
//   width: ${(props) => props.width};
//   height: ${(props) => props.height};
//   position: relative;
// `;

const StyledCardImage1Wrapper = styled.div`
  width: 303px;
  height: 125px;
  position: relative;

  ${onTablet} {
    width: 320px;
    height: 132px;
  }

  ${onPc} {
    width: 323px;
    height: 133px;
  }
`;

const StyledCardImage2Wrapper = styled(StyledCardImage1Wrapper)`
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

const StyledCardImage3Wrapper = styled(StyledCardImage1Wrapper)`
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

const StyledCardTextContainer = styled.div`
  width: 100%;
  height: 113px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 27px 32px;
  background-color: #1501cb9c;
  color: ${COLORS.WHITE};
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
