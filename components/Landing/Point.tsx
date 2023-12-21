import Image from 'next/image';
import styled from 'styled-components';
import pointImg1 from '@/public/assets/images/landing2.png';
import pointImg2 from '@/public/assets/images/landing3.png';
import { onTablet, onPc } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import { fontStyle } from '@/styles/fontStyle';


function PointSection() {
  return (
    <StyledPointSectionContainer>
      <StyledPointSectionWrapper>
        <StyledPointTextContainer>
          <StyledPointText1>Point 1</StyledPointText1>
          <StyledPointText2>
            일의 우선순위를
            <br /> 관리하세요.
          </StyledPointText2>
        </StyledPointTextContainer>
        <StyledPointSectionImage1Wrapper>
          <Image src={pointImg1} fill alt="일의 우선순위를 관리하세요." />
        </StyledPointSectionImage1Wrapper>
      </StyledPointSectionWrapper>
      <StyledPointSectionWrapper>
        <StyledPointTextContainer2>
          <StyledPointText1>Point 2</StyledPointText1>
          <StyledPointText2>
            해야할 일을
            <br /> 등록하세요
          </StyledPointText2>
        </StyledPointTextContainer2>
        <StyledPointSectionImage2Wrapper>
          <Image src={pointImg2} fill alt="해야할 일을 등록하세요" />
        </StyledPointSectionImage2Wrapper>
      </StyledPointSectionWrapper>
    </StyledPointSectionContainer>
  );
}


export default PointSection;

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
  background-color: ${COLORS.VIOLET_F1};
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
  color: ${COLORS.BLACK_33};
  font-feature-settings:
    'clig' off,
    'liga' off;
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
  color: ${COLORS.BLACK_17};
  font-feature-settings:
    'clig' off,
    'liga' off;
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
