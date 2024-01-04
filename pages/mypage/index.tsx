import DashboardNavbar from '@/components/DashboardNavbar/DashboardNavbar';
import PasswordManagerBox from '@/components/MyPage/PasswordManagerBox';
import ProfileBox from '@/components/MyPage/ProfileBox';
import Sidebar from '@/components/Sidebar/Sidebar';
import useUserData from '@/hooks/global/useUserData';
import useRedirectByLogin from '@/hooks/useRedirectByLogin';
import BackImg from '@/public/assets/icons/LeftArrow.svg';
import { fontStyle } from '@/styles/fontStyle';
import { onMobile, onTablet } from '@/styles/mediaQuery';
import { COLORS } from '@/styles/palettes';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

function MyPage() {
  useRedirectByLogin();

  const router = useRouter();
  const backHome = () => router.back();
  const { user } = useUserData();
  const [nickname, setNickName] = useState('');
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    setNickName(user.nickname);
    setPreviewImage(user.profileImageUrl);
  }, [user]);

  return (
    <StyledContainer>
      <DashboardNavbar isMyDashboard={false} />
      <Sidebar reset={reset} setReset={setReset} />
      <StyledWrapper>
        <StyledInWrapper>
          <StyledBackWrapper onClick={backHome}>돌아가기</StyledBackWrapper>
          <ProfileBox
            email={user.email}
            nickname={nickname}
            profileImg={previewImage}
            setNickName={setNickName}
            setPreviewImage={setPreviewImage}
          />
          <PasswordManagerBox />
        </StyledInWrapper>
      </StyledWrapper>
    </StyledContainer>
  );
}

export default MyPage;

const StyledContainer = styled.div`
  width: 100%;
  background-color: var(--content-back);
  `;

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 1080px;
`;

const StyledInWrapper = styled.div`
  position: absolute;
  top: 70px;
  left: 300px;
  width: calc(100% - 300px);
  height: 100vh;
  padding: 20px;

  ${onTablet} {
    left: 160px;
    width: calc(100% - 160px);
  }
  ${onMobile} {
    left: 66px;
    width: calc(100% - 66px);
    padding: 16px 12px;
  }
`;

const StyledBackWrapper = styled.button`
  ${fontStyle(16, 500)}
  background-image: url(${BackImg.src});
  background-repeat: no-repeat;
  background-position: 0px 50%;
  padding-left: 20px;
  color: var(--content-main);

  ${onMobile} {
    background-size: 18px 18px;
    font-size: 1.4rem;
  }
`;
