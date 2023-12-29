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
  }, []);

  return (
    <StyledContainer>
      <StyledImageWrapper>
        <Image fill src={profileImageUrl || Codeit} alt="프로필" />
      </StyledImageWrapper>
      <StyledNameWrapper onBlur={(e) => handleBlur(e)}>
        <label onClick={handleClickDropdown}>
          <button>{showUser.nickname}</button>
          {isDropdown && <DashboardDropdown />}
        </label>
      </StyledNameWrapper>
    </StyledContainer>
  );
}

export default Profile;

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;

  label > button {
    cursor: pointer;
    color: ${COLORS.BLACK_33};
    ${fontStyle(16, 500)}
  }

  ${onPc} {
    margin-right: 80px;
  }

  ${onTablet} {
    margin-right: 40px;
  }
  ${onMobile} {
    margin-right: 12px;
    label {
      display: none;
    }
  }
`;

const StyledImageWrapper = styled.div`
  position: relative;
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  border-radius: 100%;
  border: 2px solid ${COLORS.WHITE_FF};
  overflow: hidden;

  ${onMobile} {
    width: 34px;
    height: 34px;
  }
`;

const StyledNameWrapper = styled.div``;
