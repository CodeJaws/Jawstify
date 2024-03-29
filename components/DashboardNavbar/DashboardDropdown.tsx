import DashboardImage from '@/public/assets/icons/Dashboard.svg';
import LogoutImage from '@/public/assets/icons/Logout.svg';
import UserImage from '@/public/assets/icons/User.svg';
import { fontStyle } from '@/styles/fontStyle';
import { localStorageClear } from '@/utils/localStorage';
import { deleteCookie } from 'cookies-next';

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

interface DashboardDropdownProps {
  deviceType: string | undefined;
  isOpen: boolean;
}

function DashboardDropdown({ deviceType, isOpen }: DashboardDropdownProps) {
  const logout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      deleteCookie('accessToken');
      localStorageClear();
    }
  };

  return (
    <StyledContainer $deviceType={deviceType} $isOpen={isOpen}>
      <ul>
        <li>
          <StyledLink href="/mypage">
            <StyledImage width={15} height={15} src={UserImage} alt="내 정보" /> 내 정보
          </StyledLink>
        </li>
        <li>
          <StyledLink href="/mydashboard">
            <StyledImage width={15} height={15} src={DashboardImage} alt="내 대시보드" /> 내 대시보드
          </StyledLink>
        </li>
        <li>
          <StyledLink href="/" onClick={() => logout()}>
            <StyledImage width={15} height={15} src={LogoutImage} alt="로그아웃" />
            로그아웃
          </StyledLink>
        </li>
      </ul>
    </StyledContainer>
  );
}

export default DashboardDropdown;

const StyledContainer = styled.div<{ $deviceType: string | undefined; $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  position: absolute;
  width: 120px;
  height: auto;
  background-color: var(--nav-Dropdown-bg);
  border: var(--nav-Dropdown-border);

  top: 50px;
  right: ${({ $deviceType }) => ($deviceType === 'mobile' ? -10 : 10)}px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  padding: 5px;
  z-index: 10;

  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  ul > li {
    display: flex;
    align-items: center;
    width: auto;
    height: auto;
    padding: 7px;
    color: var(--nav-Dropdown-color);
    ${fontStyle(16, 100)}
    border-radius: 5px;

    &:hover {
      background-color: var(--nav-Dropdown-hover);
      color: var(--nav-Dropdown-color);
    }
  }
`;

const StyledLink = styled(Link)`
  width: 100%;
  display: flex;
  align-items: center;
  ${fontStyle(14, 100)}

  &:hover {
    background-color: var(--nav-Dropdown-hover);
  }
`;

const StyledImage = styled(Image)`
  margin-right: 11px;
`;
