import Image from 'next/image';
import styled from 'styled-components';

import Logo from '@/public/assets/icons/LogoSidebar.svg';
import LogoTitle from '@/public/assets/icons/LogoSidebarTitle.svg';
import AddBox from '@/public/assets/icons/invite.svg';
import { onMobile, onPc, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import { fontStyle } from '@/styles/fontStyle';
import DashboardGroup from './DashboardGroup';

/** 대시보드 목록 조회를 통해 얻은 대시보드들의 정보들 */
const DEFAULT_DASHBOARDS = [
  {
    id: 1,
    name: '중요 문서함',
    color: 'pink',
    createdByMe: true,
  },
];

function Sidebar() {
  return (
    <StyledContainer>
      <StyledImageWrapper>
        <StyledImage src={Logo} alt="사이드바 로고" />
        <StyledImage src={LogoTitle} alt="사이드바 로고 제목" />
      </StyledImageWrapper>
      <StyledTitleWrapper>
        <h3>Dash Boards</h3>
        <button>
          <Image width={20} height={20} src={AddBox} alt="추가하기" />
        </button>
      </StyledTitleWrapper>
      <DashboardGroup group={DEFAULT_DASHBOARDS} />
    </StyledContainer>
  );
}

export default Sidebar;

const StyledContainer = styled.div`
  position: relative;
  z-index: 7;
  display: flex;
  flex-direction: column;
  height: 100vh;
  flex-shrink: 0;
  background: ${COLORS.WHITE_FF};
  border: 1px solid ${COLORS.GRAY_D9};
  ${onPc} {
    width: 300px;
  }

  ${onTablet} {
    width: 160px;
  }

  ${onMobile} {
    width: 67px;
    align-items: center;
  }
`;

const StyledImage = styled(Image)`
  &:nth-child(2) {
    margin-top: 8.01px;
    ${onMobile} {
      display: none;
    }
  }
`;

const StyledImageWrapper = styled.div`
  display: flex;
  margin-top: 20px;

  ${onPc} {
    margin-left: 24px;
  }

  ${onTablet} {
    margin-left: 26px;
  }
`;

const StyledTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    color: ${COLORS.GRAY_78};
    ${fontStyle(12, 700)};
  }

  button {
    &:hover {
      transform: scale(1.1);
    }
  }

  ${onPc} {
    margin: 59.93px 24px 18px;
  }

  ${onTablet} {
    margin: 59.93px 30px 18px 24px;
    width: 116px;
  }

  ${onMobile} {
    margin-top: 38.87px;
    h3 {
      display: none;
    }
  }
`;
