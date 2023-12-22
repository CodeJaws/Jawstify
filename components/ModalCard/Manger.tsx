import { ModalContext } from '@/pages/modalcard';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import Image from 'next/image';
import { useContext } from 'react';
import styled from 'styled-components';

function Manger() {
  const { manger, mangerImg, deadLine } = useContext(ModalContext);
  return (
    <StyledContainer>
      <StyledInMangerWrapper>
        <StyledMangerWrapper>
          <StyledManger>담당자</StyledManger>
          <StyledMangerProfile>
            <StyledImage width={34} height={34} src={mangerImg} alt="프로필 이미지" />
            <StyledMangerName>{manger}</StyledMangerName>
          </StyledMangerProfile>
        </StyledMangerWrapper>
        <StyledDeadLineWrapper>
          <StyledDeadLineName>마감일</StyledDeadLineName>
          <StyledDeadLine>{deadLine}</StyledDeadLine>
        </StyledDeadLineWrapper>
      </StyledInMangerWrapper>
    </StyledContainer>
  );
}

export default Manger;

const StyledContainer = styled.div`
  width: 200px;
  height: 155px;
  border: 1px solid ${COLORS.GRAY_D9};
  border-radius: 8px;
  background-color: ${COLORS.WHITE_FF};

  ${onMobile} {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 12px 16px;
    width: 287px;
    height: 64px;
  }
`;

const StyledMangerProfile = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
  margin-bottom: 20px;

  ${onMobile} {
    margin: 0;
  }
`;

const StyledImage = styled(Image)`
  ${onMobile} {
    width: 26px;
    height: 26px;
  }
`;

const StyledInMangerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;

  ${onMobile} {
    flex-direction: row;
    gap: 62px;
    padding: 0;
  }
`;

const StyledMangerWrapper = styled.div`
  ${onMobile} {
    display: flex;
    flex-direction: column;
  }
`;

const StyledManger = styled.p`
  ${fontStyle(12, 600)};
  line-height: 20px;

  ${onMobile} {
    font-size: 1rem;
  }
`;

const StyledMangerName = styled.p`
  ${fontStyle(14, 400)};
  color: ${COLORS.BLACK_33};

  ${onMobile} {
    font-size: 1.2rem;
  }
`;

const StyledDeadLineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const StyledDeadLineName = styled.p`
  ${fontStyle(12, 600)};
  line-height: 20px;

  ${onMobile} {
    font-size: 1rem;
  }
`;

const StyledDeadLine = styled.p`
  ${fontStyle(14, 400)};
  color: ${COLORS.BLACK_33};

  ${onMobile} {
    font-size: 1.2rem;
  }
`;
