import Link from 'next/link';
import styled from 'styled-components';

import { fontStyle } from '@/styles/fontStyle';
import { COLORS } from '@/styles/palettes';
import { localStorageClear } from '@/utils/localStorage';

import UserImage from '@/public/assets/icons/User.svg';
import LogoutImage from '@/public/assets/icons/Logout.svg';
import DashboardImage from '@/public/assets/icons/Dashboard.svg';
import Image from 'next/image';
import DarkmodeButton from './DarkmodeButton';

interface DashboardDropdownProps {
  deviceType: string | undefined;
  isOpen: boolean;
}

function DashboardDropdown({ deviceType, isOpen }: DashboardDropdownProps) {
  const logout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      localStorageClear();
    }
  };

  const enableDarkmode = () => {};

  return (
    <StyledContainer $deviceType={deviceType} $isOpen={isOpen}>
      <ul>
        <li>
          <Image width={25} height={25} src={UserImage} alt="내 정보" />
          <StyledLink href="/mypage">내 정보</StyledLink>
        </li>
        <li>
          <Image width={25} height={25} src={DashboardImage} alt="내 대시보드" />
          <StyledLink href="/myboard">내 대시보드</StyledLink>
        </li>
        <li>
          <Image width={25} height={25} src={LogoutImage} alt="로그아웃" />
          <StyledLink href="/" onClick={() => logout()}>
            로그아웃
          </StyledLink>
        </li>
        <StyledSeperator></StyledSeperator>
        <li>
          <DarkmodeButton />
        </li>
        {/* <li><StyledWrapper onClick={enableDarkmode}>다크모드</StyledWrapper></li> */}
      </ul>
    </StyledContainer>
  );
}

export default DashboardDropdown;

const StyledContainer = styled.div<{ $deviceType: string | undefined; $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  position: absolute;
  width: 217px;
  height: auto;
  background-color: ${COLORS.WHITE_FF};
  border: 1px solid ${COLORS.GRAY_D9};
  top: 50px;
  /* right: 0px; */
  right: ${({ $deviceType }) => ($deviceType === 'mobile' ? 10 : 10)}px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  padding: 13px 8px;
  z-index: 3;

  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  ul > li {
    display: flex;
    align-items: center;
    margin-left: 10px;
    margin-top: 10px;
    gap: 10px;
    width: 100%;
    ${fontStyle(16, 100)}
    &:hover {
      background-color: ${COLORS.GRAY_F5};
    }
  }
`;

const StyledLink = styled(Link)`
  width: 100%;
  ${fontStyle(14, 100)}
  &:hover {
    background-color: ${COLORS.GRAY_F5};
  }
`;

const StyledWrapper = styled.div`
  cursor: pointer;
  width: 100%;
  ${fontStyle(14, 100)}
  &:hover {
    background-color: ${COLORS.GRAY_F5};
  }
`;

const StyledSeperator = styled.div`
  border: 1px solid black;
`;
