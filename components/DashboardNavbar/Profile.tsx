import Image from 'next/image';
import styled from 'styled-components';

import useProfile from '@/hooks/DashboardNavbar/useProfile';
import DashboardDropdown from '@/components/DashboardNavbar/DashboardDropdown';
import DefaultImg from '@/public/assets/images/jaws.png';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onPc, onTablet } from '@/styles/mediaQuery';

function Profile() {
  const { handleBlur, handleClickDropdown, profileImageUrl, nickname, deviceType, isDropdown } = useProfile();

  return (
    <StyledContainer onBlur={(e) => handleBlur(e)}>
      <StyledButton onMouseDown={handleClickDropdown}>
        <StyledImageWrapper>
          <StyledImage fill sizes="100%" src={profileImageUrl || DefaultImg} alt="프로필" />
        </StyledImageWrapper>
        <StyledNameWrapper>{nickname}</StyledNameWrapper>
      </StyledButton>
      <DashboardDropdown deviceType={deviceType} isOpen={isDropdown} />
    </StyledContainer>
  );
}

export default Profile;

const StyledNameWrapper = styled.div`
  margin-left: 12px;
  ${fontStyle(16, 500)};
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  color: var(--content-main);
  cursor: pointer;
`;

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;

  ${onPc} {
    margin-right: 30px;
  }

  ${onTablet} {
    margin-right: 12px;
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
