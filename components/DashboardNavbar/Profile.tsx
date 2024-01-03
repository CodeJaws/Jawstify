import Image from 'next/image';
import styled from 'styled-components';

import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onPc, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import Codeit from '@/public/assets/icons/Codeit.svg';
import useUserData from '@/hooks/global/useUserData';
import { FocusEvent, useEffect, useState } from 'react';
import { UserType } from '@/types/apiType';
import DashboardDropdown from './DashboardDropdown';
import useDeviceType from '@/hooks/useDeviceType';

function Profile() {
  const { user } = useUserData();

  const [showUser, setShowUser] = useState<UserType>({
    createdAt: '',
    email: '',
    id: 0,
    nickname: '',
    profileImageUrl: null,
    updatedAt: '',
  });
  const { nickname, profileImageUrl } = showUser;
  const deviceType = useDeviceType();

  const [isDropdown, setIsDropdown] = useState(false);

  const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDropdown(false);
    }
  };

  const handleClickDropdown = () => {
    setIsDropdown((prev) => !prev);
  };

  useEffect(() => {
    setShowUser(user);
  }, [user]);

  return (
    <>
      <StyledContainer onBlur={(e) => handleBlur(e)}>
        <StyledButton onMouseDown={handleClickDropdown}>
          <StyledImageWrapper>
            <StyledImage fill sizes="100%" src={profileImageUrl || Codeit} alt="프로필" />
          </StyledImageWrapper>
          <StyledNameWrapper>{nickname}</StyledNameWrapper>
        </StyledButton>
        <DashboardDropdown deviceType={deviceType} isOpen={isDropdown} />
      </StyledContainer>
    </>
  );
}

export default Profile;

const StyledNameWrapper = styled.div`
  ${fontStyle(16, 500)};
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  color: ${COLORS.BLACK_33};
  cursor: pointer;
`;

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;

  ${onPc} {
    margin-right: 80px;
  }

  ${onTablet} {
    margin-right: 40px;
  }
  ${onMobile} {
    margin-right: 12px;
    ${StyledNameWrapper} {
      display: none;
    }
  }
`;

const StyledImage = styled(Image)`
  cursor: pointer;
`;

const StyledImageWrapper = styled.div`
  position: relative;
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  border-radius: 100%;
  border: var(--nav-imgBorder);
  overflow: hidden;

  ${onMobile} {
    width: 34px;
    height: 34px;
  }
`;

const StyledButton = styled.button`
  color: var(--content-main);
`;
