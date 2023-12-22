import pointImg1 from '@/public/assets/images/landing2.png';
import pointImg2 from '@/public/assets/images/landing3.png';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onPc, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import Image from 'next/image';
import styled from 'styled-components';

function PointSection() {
  return (
    <StyledPointSectionContainer>
      <StyledPoint1SectionWrapper>
        <StyledPoint1SectionTextContainer>
          <StyledPoint1SectionText1>Point 1</StyledPoint1SectionText1>
          <StyledPoint1SectionText2>
            일의 우선순위를
            <br /> 관리하세요.
          </StyledPoint1SectionText2>
        </StyledPoint1SectionTextContainer>
        <StyledPoint1SectionImageContainer>
          <Image src={pointImg1} fill alt="일의 우선순위를 관리하세요." />
        </StyledPoint1SectionImageContainer>
      </StyledPoint1SectionWrapper>
      <StyledPoint2SectionWrapper>
        <StyledPoint2SectionTextContainer>
          <StyledPoint2SectionText1>Point 2</StyledPoint2SectionText1>
          <StyledPoint2SectionText2>
            해야할 일을
            <br /> 등록하세요
          </StyledPoint2SectionText2>
        </StyledPoint2SectionTextContainer>
        <StyledPoint2SectionImageContainer>
          <Image src={pointImg2} fill alt="해야할 일을 등록하세요" />
        </StyledPoint2SectionImageContainer>
      </StyledPoint2SectionWrapper>
    </StyledPointSectionContainer>
  );
}

export default PointSection;

const StyledPointSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 90px;

  ${onMobile} {
    gap: 59px;
  }
`;

const StyledPoint1SectionWrapper = styled.div`
  width: 343px;
  height: 686px;
  background-color: ${COLORS.VIOLET_F1};
  border-radius: 8px;
  position: relative;
  display: grid;
  grid-template-areas:
    'text'
    'image';

  ${onTablet} {
    width: 664px;
    height: 972px;
  }

  ${onPc} {
    width: 1200px;
    height: 600px;
    grid-template-areas:
      'text .'
      '. image';
  }
`;

const StyledPoint1SectionTextContainer = styled.div`
  /* border: 1px solid #000; */
  text-align: center;

  ${onTablet} {
    /* text-align: start; */
    /* padding: 63px 60px; */
  }

  ${onPc} {
    text-align: start;
    transform: translateY(30%);
    padding-left: 60px;
  }
`;

const StyledPoint1SectionText1 = styled.div`
  color: ${COLORS.BLACK_33};
  font-feature-settings:
    'clig' off,
    'liga' off;
  ${fontStyle(18, 500)};
  /* margin: 60px 0; */
  /* text-align: center; */

  ${onTablet} {
    ${fontStyle(22, 500)};
    /* margin-bottom: 100px; */
  }

  ${onPc} {
    ${fontStyle(22, 500)};
    margin-bottom: 100px;
  }
`;

const StyledPoint1SectionText2 = styled.div`
  /* border: 1px solid #000; */
  color: ${COLORS.BLACK_17};
  font-feature-settings:
    'clig' off,
    'liga' off;
  ${fontStyle(36, 700)};
  /* text-align: center; */

  ${onTablet} {
    ${fontStyle(48, 700)};
  }

  ${onPc} {
    ${fontStyle(48, 700)};
    /* text-align: end; */
  }
`;

const StyledPoint1SectionImageContainer = styled.div`
  width: 296px;
  height: 248px;
  position: absolute;
  bottom: 0;
  right: 0;

  ${onTablet} {
    width: 519px;
    height: 435px;
  }

  ${onPc} {
    width: 594px;
    height: 497px;
  }
`;

const StyledPoint2SectionWrapper = styled.div`
  width: 343px;
  height: 686px;
  background-color: ${COLORS.VIOLET_F1};
  border-radius: 8px;
  position: relative;
  display: grid;
  grid-template-areas:
    'text'
    'image';

  ${onTablet} {
    width: 664px;
    height: 972px;
  }

  ${onPc} {
    width: 1200px;
    height: 600px;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: '.  text';
  }
`;

const StyledPoint2SectionTextContainer = styled.div`
  border: 1px solid #000;

  ${onTablet} {
    /* text-align: start; */
    /* padding: 63px 60px; */
  }

  ${onPc} {
    /* text-align: end; */
    /* padding: 123px 60px; */
  }
`;

const StyledPoint2SectionText1 = styled.div`
  color: ${COLORS.BLACK_33};
  font-feature-settings:
    'clig' off,
    'liga' off;
  ${fontStyle(18, 500)};
  /* margin: 60px 0; */
  /* text-align: center; */

  ${onTablet} {
    ${fontStyle(22, 500)};
    /* margin-bottom: 100px; */
  }

  ${onPc} {
    ${fontStyle(22, 500)};
    /* margin-bottom: 100px; */
  }
`;

const StyledPoint2SectionText2 = styled.div`
  border: 1px solid #000;
  color: ${COLORS.BLACK_17};
  font-feature-settings:
    'clig' off,
    'liga' off;
  ${fontStyle(36, 700)};
  /* text-align: center; */

  ${onTablet} {
    ${fontStyle(48, 700)};
  }

  ${onPc} {
    ${fontStyle(48, 700)};
    /* text-align: end; */
  }
`;

const StyledPoint2SectionImageContainer = styled.div`
  width: 217px;
  height: 250px;
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);

  ${onTablet} {
    width: 360px;
    height: 415px;
  }

  ${onPc} {
    width: 436px;
    height: 502px;
    transform: translate(0);
    left: 108px;
  }
`;
